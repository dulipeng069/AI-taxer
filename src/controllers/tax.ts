
import { Context } from 'hono';
import { getPrisma } from '../lib/prisma';

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

      // 1. Create UploadBatch
      // Calculate totals
      const totalRecords = records.length;
      const totalAmount = records.reduce((sum: number, r: any) => sum + Number(r.income), 0);

      const batch = await prisma.uploadBatch.create({
        data: {
          id: batchId, // Use provided batchId or generate one
          enterpriseId,
          fileName: fileName || `Batch-${batchId}`,
          totalRecords,
          totalAmount,
          status: 'SUCCESS',
          uploadTime: new Date()
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
                idNumber: r.idNumber
            });
            allIdNumbers.push(r.idNumber);
        }
      });

      // 1. Find existing employees
      // Chunk the findMany query to avoid SQLite variable limit
      const existingEmployees: any[] = [];
      const FIND_CHUNK_SIZE = 50; // Safe limit for D1 'in' clause
      
      for (let i = 0; i < allIdNumbers.length; i += FIND_CHUNK_SIZE) {
        const chunk = allIdNumbers.slice(i, i + FIND_CHUNK_SIZE);
        const found = await prisma.employee.findMany({
            where: {
                enterpriseId,
                idNumber: { in: chunk }
            },
            select: { id: true, idNumber: true }
        });
        existingEmployees.push(...found);
      }

      const existingIdSet = new Set(existingEmployees.map(e => e.idNumber));
      
      // 2. Identify new employees
      const newEmployees = Array.from(employeeMap.values()).filter(e => !existingIdSet.has(e.idNumber));

      // 3. Bulk create new employees
      if (newEmployees.length > 0) {
          // Split into chunks for createMany to avoid SQLite variable limit
          const EMP_CREATE_CHUNK = 50;
          for (let i = 0; i < newEmployees.length; i += EMP_CREATE_CHUNK) {
              await prisma.employee.createMany({
                  data: newEmployees.slice(i, i + EMP_CREATE_CHUNK)
              });
          }
      }

      // 4. Fetch all employees to get IDs (including newly created ones)
      // Chunk this query as well
      const allEmployees: any[] = [];
      for (let i = 0; i < allIdNumbers.length; i += FIND_CHUNK_SIZE) {
        const chunk = allIdNumbers.slice(i, i + FIND_CHUNK_SIZE);
        const found = await prisma.employee.findMany({
            where: {
                enterpriseId,
                idNumber: { in: chunk }
            },
            select: { id: true, idNumber: true }
        });
        allEmployees.push(...found);
      }

      const empIdMap = new Map<string, string>();
      allEmployees.forEach(e => empIdMap.set(e.idNumber, e.id));

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

      // 6. Bulk create TaxRecords
      // Use createMany with chunks
      const RECORD_BATCH_SIZE = 100;
      for (let i = 0; i < taxRecordsData.length; i += RECORD_BATCH_SIZE) {
          const chunk = taxRecordsData.slice(i, i + RECORD_BATCH_SIZE);
          await prisma.taxRecord.createMany({
              data: chunk
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
    
    try {
        const where = companyId ? { enterpriseId: companyId } : {};

        const records = await prisma.taxRecord.findMany({
            where,
            include: {
                employee: true,
                batch: true
            },
            orderBy: { paymentDate: 'desc' }
        });

        // Transform to frontend format
        const formatted = records.map(r => ({
            id: r.id,
            companyId: r.enterpriseId,
            date: r.paymentDate.toISOString().split('T')[0],
            name: r.employee.name,
            idNumber: r.employee.idNumber,
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
        }));

        return c.json(formatted);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
  },

  // Delete a batch
  deleteBatch: async (c: Context) => {
    const prisma = getPrisma(c);
    const batchId = c.req.param('id');

    try {
        // Transactional delete
        await prisma.$transaction([
            // Delete records first (though cascading might handle it if set up, but explicit is safer here)
            prisma.taxRecord.deleteMany({
                where: { batchId }
            }),
            // Delete batch
            prisma.uploadBatch.delete({
                where: { id: batchId }
            })
        ]);

        return c.json({ status: 'ok' });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
  }
};
