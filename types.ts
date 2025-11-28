
export interface RawInput {
  id: string; // Unique record ID
  companyId: string; // Belongs to which company (Legacy field, kept for compatibility)
  enterpriseId?: string; // New field for enterprise distinction (same as companyId)
  date: string; // YYYY-MM-DD
  name: string;
  idNumber: string; // Identity Card
  income: number;
  batchId?: string; // Upload Batch ID
}

export type Enterprise = EnterpriseAccount; // Alias for consistency

export interface SuperAdmin {
  id: string;
  username: string;
  role: 'super_admin';
}

export interface EnterpriseAccount {
  id: string;
  companyName: string;
  username: string; // Login account
  password?: string; // For mock login check
  status: 'active' | 'disabled';
  createdAt: number;
  permissions: string[]; // e.g., ['calculation', 'reports', 'history']
}

export interface UserSession {
  userId: string;
  username: string;
  role: 'super_admin' | 'enterprise_admin';
  companyId?: string; // If enterprise_admin
  companyName?: string;
}

export interface CalculatedTaxRecord extends RawInput {
  paymentMonth: string; // YYYYMM
  continuousMonthsCount: number; // 连续月份
  segmentCumulativeIncome: number; // 连续阶段累计收入
  segmentCumulativeTaxableIncome: number; // 连续阶段内累计应纳税所得额
  taxRate: number; // 预扣率 (0.2, 0.3, 0.4)
  quickDeduction: number; // 速算扣除数
  segmentTotalTax: number; // 连续阶段内应纳税额
  segmentPriorTaxPaid: number; // 连续阶段内已扣税额
  currentTax: number; // 本期预扣税额
  afterTaxIncome: number; // 税后应付金额
  isNewSegment: boolean; // Helper for UI styling
}

export interface TaxRateRule {
  limit: number; // Taxable Income Limit
  rate: number;
  deduction: number;
}

export interface UserSettings {
  companyName: string;
  userName: string;
  userRole: string;
  avatarUrl: string;
}
