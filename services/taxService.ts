
import { RawInput, CalculatedTaxRecord } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const taxService = {
  // Upload a batch of data
  uploadData: async (companyId: string, records: CalculatedTaxRecord[], fileName?: string) => {
    // We need a batch ID. Usually generated on frontend or backend. 
    // Frontend generates it currently in TaxTable.tsx.
    // We'll take the batchId from the first record if available, or generate one.
    const batchId = records.length > 0 ? records[0].batchId : `BATCH-${Date.now()}`;

    const response = await fetch(`${API_BASE_URL}/api/tax/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        enterpriseId: companyId,
        batchId,
        fileName,
        records: records.map(r => ({
            ...r,
            // Ensure numbers are numbers
            income: Number(r.income),
            currentTax: Number(r.currentTax),
            afterTaxIncome: Number(r.afterTaxIncome),
            // ... other fields
        }))
      })
    });

    if (!response.ok) {
      const errorData = await response.json() as { error?: string };
      throw new Error(errorData.error || 'Failed to upload data');
    }

    return await response.json();
  },

  // Get all records for a company (or all if no companyId provided)
  getRecords: async (companyId?: string) => {
    const query = companyId ? `?companyId=${companyId}` : '';
    const response = await fetch(`${API_BASE_URL}/api/tax/records${query}`);
    
    if (!response.ok) {
       throw new Error('Failed to fetch records');
    }

    return await response.json() as RawInput[];
  },

  // Delete a batch
  deleteBatch: async (batchId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/tax/batch/${batchId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete batch');
    }

    return await response.json();
  }
};
