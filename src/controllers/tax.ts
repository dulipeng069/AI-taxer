
import { Context } from 'hono';
import { getPrisma } from '../lib/prisma';

// Helper to generate a unique user code
const generateUserCode = () => {
  // Format: UID-{Random 8 Chars}
  // Example: UID-X7A1B9C2
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed ambiguous chars like I, O, 1, 0
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `UID-${result}`;
};

// Retry helper for SQLite locking issues
const retryTransaction = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 100
): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && (error?.message?.includes('SQLITE_BUSY') || error?.message?.includes('database is locked'))) {
      console.log(`[SQLite] Database locked, retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryTransaction(fn, retries - 1, delay * 2); // Exponential backoff
    }
    throw error;
  }
};

export const taxController = {
  // Upload a batch of records
  uploadBatch: async (c: Context) => {
    const prisma = getPrisma(c);
    try {
      const body = await c.req.json();
      const { enterpriseId, batchId, records, fileName } = body;

      if (!enterpriseId || !batchId || !records || !Array.isArray(records)) {
        return c.json({ error: 'Invalid input data' }, 400);
      }

      // 1. Create or Update UploadBatch
      // Calculate totals
      const totalRecords = records.length;
      const totalAmount = records.reduce((sum: number, r: any) => sum + Number(r.income), 0);

      const batch = await prisma.uploadBatch.upsert({
        where: { id: batchId },
        create: {
          id: batchId, // Use provided batchId or generate one
          enterpriseId,
          fileName: fileName || `Batch-${batchId}`,
          totalRecords,
          totalAmount,
          status: 'SUCCESS',
          uploadTime: new Date()
        },
        update: {
            totalRecords: { increment: totalRecords },
            totalAmount: { increment: totalAmount }
        }
      });

      // 2. Create TaxRecords
      // Optimize Employee creation to avoid "Too many subrequests"
      
      // Extract unique employees from records
      const employeeMap = new Map<string, any>();
      const allIdNumbers: string[] = [];
      
      records.forEach((r: any) => {
        const key = `${enterpriseId}-${r.idNumber}`;
        if (!employeeMap.has(key)) {
            employeeMap.set(key, {
                enterpriseId,
                name: r.name,
                idNumber: r.idNumber,
                code: generateUserCode() // Generate User ID Code
            });
            allIdNumbers.push(r.idNumber);
        }
      });

      // 1. Find existing employees
      // Chunk the findMany query to avoid SQLite variable limit
      const existingEmployees: any[] = [];
      const employeesToUpdateInUpload: any[] = [];
      const FIND_CHUNK_SIZE = 50; // Safe limit for D1 'in' clause
      
      for (let i = 0; i < allIdNumbers.length; i += FIND_CHUNK_SIZE) {
        const chunk = allIdNumbers.slice(i, i + FIND_CHUNK_SIZE);
        const found = await prisma.employee.findMany({
            where: {
                enterpriseId,
                idNumber: { in: chunk }
            },
            select: { id: true, idNumber: true, code: true }
        });
        
        // Check for missing codes in existing employees
        found.forEach(e => {
            if (!e.code) {
                e.code = generateUserCode();
                employeesToUpdateInUpload.push({ id: e.id, code: e.code });
            }
        });
        
        existingEmployees.push(...found);
      }

      // Backfill codes for existing employees during upload
      if (employeesToUpdateInUpload.length > 0) {
           const UPDATE_CHUNK = 10; // Reduced chunk size for updates
           for (let i = 0; i < employeesToUpdateInUpload.length; i += UPDATE_CHUNK) {
               const chunk = employeesToUpdateInUpload.slice(i, i + UPDATE_CHUNK);
               await retryTransaction(async () => {
                   await prisma.$transaction(
                       chunk.map(e => prisma.employee.update({
                           where: { id: e.id },
                           data: { code: e.code }
                       }))
                   );
               });
           }
      }

      const existingIdSet = new Set(existingEmployees.map(e => e.idNumber));
      
      // 2. Identify new employees
      const newEmployees = Array.from(employeeMap.values()).filter(e => !existingIdSet.has(e.idNumber));

      // 3. Bulk create new employees
      if (newEmployees.length > 0) {
          // Split into chunks for create transactions to avoid SQLite variable limit
          const EMP_CREATE_CHUNK = 20; // Reduced chunk size
          for (let i = 0; i < newEmployees.length; i += EMP_CREATE_CHUNK) {
              const chunk = newEmployees.slice(i, i + EMP_CREATE_CHUNK);
              
              await retryTransaction(async () => {
                  const createdEmployees = await prisma.$transaction(
                    chunk.map(employeeData => prisma.employee.create({ data: employeeData }))
                  );
                  existingEmployees.push(...createdEmployees);
              });
          }
      }

      // 4. Map IDs (No need to re-query)
      const empIdMap = new Map<string, string>();
      existingEmployees.forEach(e => empIdMap.set(e.idNumber, e.id));
      
      console.log(`[API] Mapped ${empIdMap.size} employees`);

      // 5. Prepare TaxRecords
      const taxRecordsData = records.map((r: any) => {
        const employeeId = empIdMap.get(r.idNumber);
        if (!employeeId) {
            console.warn(`Skipping record for ${r.idNumber}: Employee ID not found after creation`);
            return null;
        }

        return {
            enterpriseId,
            employeeId,
            batchId: batch.id,
            period: r.date.substring(0, 7),
            paymentDate: new Date(r.date),
            income: r.income,
            taxableIncome: r.segmentCumulativeTaxableIncome || 0,
            taxRate: r.taxRate || 0,
            quickDeduction: r.quickDeduction || 0,
            taxPayable: r.segmentTotalTax || 0,
            taxPaid: r.segmentPriorTaxPaid || 0,
            currentTax: r.currentTax,
            afterTaxIncome: r.afterTaxIncome,
            isNewSegment: false
        };
      }).filter((r: any) => r !== null);

      console.log(`[API] Prepared ${taxRecordsData.length} tax records to save`);

      // 6. Bulk create TaxRecords
      // Use transaction with chunks
      const RECORD_BATCH_SIZE = 20; // Significantly reduced batch size for SQLite
      for (let i = 0; i < taxRecordsData.length; i += RECORD_BATCH_SIZE) {
          const chunk = taxRecordsData.slice(i, i + RECORD_BATCH_SIZE);
          await retryTransaction(async () => {
            await prisma.$transaction(
                chunk.map(recordData => prisma.taxRecord.create({ data: recordData }))
            );
          });
      }

      return c.json({ status: 'ok', batchId: batch.id });
    } catch (e: any) {
      console.error('Upload error:', e);
      return c.json({ error: e.message }, 500);
    }
  },

  // Get all records for a company (or all for super admin if no companyId filtered)
  getRecords: async (c: Context) => {
    const prisma = getPrisma(c);
    const companyId = c.req.query('companyId');
    
    console.log(`[API] getRecords called for companyId: ${companyId}`);

    try {
        const where = companyId ? { enterpriseId: companyId } : {};

        // 1. Fetch Tax Records ONLY (No Include) to avoid "Too many SQL variables"
        const records = await prisma.taxRecord.findMany({
            where,
            orderBy: { paymentDate: 'desc' }
        });

        console.log(`[API] Found ${records.length} records. Fetching employees...`);

        // 2. Collect Unique Employee IDs
        const employeeIds = new Set<string>();
        records.forEach(r => {
            if (r.employeeId) employeeIds.add(r.employeeId);
        });
        
        const uniqueEmpIds = Array.from(employeeIds);
        console.log(`[API] Unique employees to fetch: ${uniqueEmpIds.length}`);

        // 3. Fetch Employees in Chunks
        const employeeMap = new Map<string, any>();
        const CHUNK_SIZE = 50; // Reduced chunk size for safety on D1
        
        console.log(`[API] Fetching ${uniqueEmpIds.length} employees in chunks of ${CHUNK_SIZE}`);

        const employeesToUpdate: any[] = [];

        for (let i = 0; i < uniqueEmpIds.length; i += CHUNK_SIZE) {
            const chunk = uniqueEmpIds.slice(i, i + CHUNK_SIZE);
            try {
                const employees = await prisma.employee.findMany({
                    where: { id: { in: chunk } },
                    select: { id: true, name: true, idNumber: true, code: true }
                });
                
                employees.forEach(e => {
                    // If code is missing, generate it and mark for update
                    if (!e.code) {
                        e.code = generateUserCode();
                        employeesToUpdate.push({ id: e.id, code: e.code });
                    }
                    employeeMap.set(e.id, e);
                });
            } catch (chunkError) {
                console.error(`[API] Error fetching employee chunk ${i/CHUNK_SIZE}:`, chunkError);
            }
        }

        // Update missing codes in background (or await if critical)
        if (employeesToUpdate.length > 0) {
            console.log(`[API] Backfilling codes for ${employeesToUpdate.length} employees...`);
            // Execute updates in chunks
            const UPDATE_CHUNK = 20;
            for (let i = 0; i < employeesToUpdate.length; i += UPDATE_CHUNK) {
                 const chunk = employeesToUpdate.slice(i, i + UPDATE_CHUNK);
                 await prisma.$transaction(
                    chunk.map(e => prisma.employee.update({
                        where: { id: e.id },
                        data: { code: e.code }
                    }))
                 );
            }
        }

        // 4. Combine Data
        const formatted = records.map(r => {
            const emp = employeeMap.get(r.employeeId);
            return {
                id: r.id,
                companyId: r.enterpriseId,
                date: r.paymentDate.toISOString().split('T')[0],
                name: emp?.name || 'Unknown',
                idNumber: emp?.idNumber || 'Unknown',
                employeeCode: emp?.code || '-', // Return Employee Code
                income: Number(r.income),
                batchId: r.batchId,
                // Restore calculation fields if possible, or just basic ones
                currentTax: Number(r.currentTax),
                afterTaxIncome: Number(r.afterTaxIncome),
                taxRate: Number(r.taxRate),
                quickDeduction: Number(r.quickDeduction),
                segmentCumulativeTaxableIncome: Number(r.taxableIncome),
                segmentTotalTax: Number(r.taxPayable),
                segmentPriorTaxPaid: Number(r.taxPaid),
                paymentMonth: r.period, // Approximation
            };
        });

        return c.json(formatted);
    } catch (e: any) {
        console.error("[API] getRecords Error:", e);
        return c.json({ error: e.message }, 500);
    }
  },

  // Delete a batch
  deleteBatch: async (c: Context) => {
    const prisma = getPrisma(c);
    const batchId = c.req.param('id');

    try {
        // D1 does not support transactions fully yet, so we do sequential deletes
        // 1. Delete tax records
        const deletedRecords = await prisma.taxRecord.deleteMany({
            where: { batchId }
        });
        console.log(`[API] Deleted ${deletedRecords.count} records for batch ${batchId}`);
        
        // 2. Delete batch metadata
        await prisma.uploadBatch.delete({
            where: { id: batchId }
        });
        console.log(`[API] Deleted batch metadata for ${batchId}`);

        return c.json({ status: 'ok' });
    } catch (e: any) {
        console.error(`[API] Delete batch failed:`, e);
        return c.json({ error: e.message }, 500);
    }
  }
};
