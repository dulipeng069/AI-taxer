
import { RawInput, CalculatedTaxRecord } from '../types';

let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Safety override: Ensure we never connect to Cloudflare from the deployed instance
if (API_BASE_URL.includes('workers.dev') || API_BASE_URL.includes('ai-taxer.com')) {
  API_BASE_URL = '';
}

export const taxService = {
  // Upload a batch of data
  uploadData: async (companyId: string, records: CalculatedTaxRecord[], fileName?: string) => {
    // We need a batch ID. Usually generated on frontend or backend. 
    // Frontend generates it currently in TaxTable.tsx.
    // We'll take the batchId from the first record if available, or generate one.
    const batchId = records.length > 0 ? records[0].batchId : `BATCH-${Date.now()}`;

    // Chunking logic to support "unlimited" uploads
    // We split the upload into smaller chunks to avoid backend timeouts and memory limits
    const CHUNK_SIZE = 200; 
    const totalChunks = Math.ceil(records.length / CHUNK_SIZE);
    let lastResponse: any = { status: 'ok', batchId };

    for (let i = 0; i < totalChunks; i++) {
        const chunk = records.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
        
        const response = await fetch(`${API_BASE_URL}/api/tax/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            enterpriseId: companyId,
            batchId,
            fileName,
            records: chunk.map(r => ({
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
          throw new Error(errorData.error || `Failed to upload chunk ${i + 1}/${totalChunks}`);
        }
        
        lastResponse = await response.json();
    }

    return lastResponse;
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
