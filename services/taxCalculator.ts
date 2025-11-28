import { RawInput, CalculatedTaxRecord, TaxRateRule } from '../types';

// 2025 Labor Remuneration Tax Rates (Standard Progressive Rates)
const TAX_RATES: TaxRateRule[] = [
  { limit: 36000, rate: 0.03, deduction: 0 },
  { limit: 144000, rate: 0.1, deduction: 2520 },
  { limit: 300000, rate: 0.2, deduction: 16920 },
  { limit: 420000, rate: 0.25, deduction: 31920 },
  { limit: 660000, rate: 0.3, deduction: 52920 },
  { limit: 960000, rate: 0.35, deduction: 85920 },
  { limit: Infinity, rate: 0.45, deduction: 181920 },
];

/**
 * Calculates the Taxable Income based on China's Labor Remuneration rules (Policy 16).
 * Formula: Taxable = (Cumulative Income * 0.8) - (Continuous Months * 5000)
 */
const calculateTaxableIncome = (cumulativeIncome: number, continuousMonths: number): number => {
  const taxable = (cumulativeIncome * 0.8) - (continuousMonths * 5000);
  return Math.max(0, taxable);
};

const getTaxRateAndDeduction = (taxableIncome: number): { rate: number; deduction: number } => {
  for (const rule of TAX_RATES) {
    if (taxableIncome <= rule.limit) {
      return { rate: rule.rate, deduction: rule.deduction };
    }
  }
  return TAX_RATES[TAX_RATES.length - 1];
};

/**
 * Helper to get Month difference between two YYYY-MM-DD strings
 */
const getMonthDiff = (d1: Date, d2: Date) => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months; // 0 if same month, 1 if consecutive, >1 if gap
};

export const processTaxRecords = (inputs: RawInput[]): CalculatedTaxRecord[] => {
  // 1. Group by Person (ID Number)
  // 2. Sort by Date
  // 3. Iterate to calculate logic
  
  // Clone to avoid mutation
  const sortedInputs = [...inputs].sort((a, b) => {
    // Sort by ID Number first to group people
    if (a.idNumber !== b.idNumber) return a.idNumber.localeCompare(b.idNumber);
    // Then sort by Date ascending
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const results: CalculatedTaxRecord[] = [];
  
  // Track continuous state per person
  let currentPersonId = '';
  let lastPaymentDate: Date | null = null;
  let segmentCumulativeIncome = 0;
  let segmentPriorTaxPaid = 0;
  let continuousMonthsCount = 0;
  
  // Helper to track visited months in current segment to increment counter
  let segmentMonthsSet = new Set<string>();

  sortedInputs.forEach((record) => {
    const recordDate = new Date(record.date);
    const monthStr = `${recordDate.getFullYear()}${(recordDate.getMonth() + 1).toString().padStart(2, '0')}`;
    
    // Check if new person
    if (record.idNumber !== currentPersonId) {
      currentPersonId = record.idNumber;
      lastPaymentDate = recordDate;
      segmentCumulativeIncome = 0;
      segmentPriorTaxPaid = 0;
      continuousMonthsCount = 1;
      segmentMonthsSet = new Set([monthStr]);
    }

    // Check continuity with previous record for same person
    const monthDiff = lastPaymentDate ? getMonthDiff(lastPaymentDate, recordDate) : 0;
    
    let isNewSegment = false;

    // Reset logic: New person (handled above) OR Gap > 1 month
    if (monthDiff > 1) {
       // Gap detected, reset segment
       segmentCumulativeIncome = 0;
       segmentPriorTaxPaid = 0;
       continuousMonthsCount = 1;
       segmentMonthsSet = new Set([monthStr]);
       isNewSegment = true;
    } else {
       // Continuous or Same Month
       if (!segmentMonthsSet.has(monthStr)) {
         continuousMonthsCount += 1;
         segmentMonthsSet.add(monthStr);
       }
       // If it's the very first record of a person in the list
       if (results.length > 0 && results[results.length-1].idNumber !== record.idNumber) {
           isNewSegment = true;
       }
    }

    // Accumulate Income (Fix floating point errors by toFixed(2))
    segmentCumulativeIncome = Number((segmentCumulativeIncome + Number(record.income)).toFixed(2));

    // Calculate Taxable Income for the Segment using New Policy Logic
    const segmentTaxableIncome = calculateTaxableIncome(segmentCumulativeIncome, continuousMonthsCount);

    // Get Rate based on Annual Comprehensive Income table
    const { rate, deduction } = getTaxRateAndDeduction(segmentTaxableIncome);

    // Calculate Total Tax for Segment
    // Math.floor/round? Usually standard tax is rounded to 2 decimals, but user screenshot shows integers. 
    // Standard practice is 2 decimals, but let's stick to standard calculation then round final display if needed.
    // However, the prompt screenshot showed integers. Let's keep 2 decimals for precision, display integers in UI if needed.
    const segmentTotalTax = (segmentTaxableIncome * rate) - deduction;

    // Calculate Current Tax Payable
    // Must compare with what was ALREADY paid in this segment
    let currentTax = segmentTotalTax - segmentPriorTaxPaid;
    currentTax = Math.max(0, currentTax); // Cannot be negative

    // Update Prior Tax for next iteration
    segmentPriorTaxPaid = Number((segmentPriorTaxPaid + currentTax).toFixed(2));
    lastPaymentDate = recordDate;

    results.push({
      ...record,
      paymentMonth: monthStr,
      continuousMonthsCount,
      segmentCumulativeIncome,
      segmentCumulativeTaxableIncome: Number(segmentTaxableIncome.toFixed(2)),
      taxRate: rate,
      quickDeduction: deduction,
      segmentTotalTax: Number(segmentTotalTax.toFixed(2)),
      segmentPriorTaxPaid: Number((segmentPriorTaxPaid - currentTax).toFixed(2)), // Prior tax *before* this payment
      currentTax: Number(currentTax.toFixed(2)),
      afterTaxIncome: Number((record.income - currentTax).toFixed(2)),
      isNewSegment: isNewSegment || (results.length === 0) || (results[results.length-1].idNumber !== record.idNumber)
    });
  });

  return results;
};