
import React, { useMemo } from 'react';
import { RawInput, CalculatedTaxRecord } from '../types';
import { Trash2, FileSpreadsheet, Archive, Calendar } from 'lucide-react';
import * as XLSX from 'xlsx';

import { taxService } from '../services/taxService';

interface HistoryRecordsProps {
  inputs: RawInput[];
  companyId?: string;
  onDataChange: () => void;
  calculatedData: CalculatedTaxRecord[];
  readOnly?: boolean;
}

const HistoryRecords: React.FC<HistoryRecordsProps> = ({ inputs, companyId, onDataChange, calculatedData, readOnly }) => {
  
  // Group by Batch ID
  const batchStats = useMemo(() => {
    const stats = new Map<string, { count: number; income: number; tax: number; firstDate: string }>();
    
    calculatedData.forEach((d: CalculatedTaxRecord) => {
      if (!d.batchId) return;
      if (!stats.has(d.batchId)) {
        stats.set(d.batchId, { count: 0, income: 0, tax: 0, firstDate: d.date });
      }
      const current = stats.get(d.batchId)!;
      current.count += 1;
      current.income += d.income;
      current.tax += d.currentTax;
    });

    return Array.from(stats.entries())
      .map(([id, stat]) => ({
        id,
        ...stat
      }))
      .sort((a, b) => b.id.localeCompare(a.id)); // Newest first
  }, [calculatedData]);

  const handleDeleteBatch = async (batchId: string) => {
    const count = inputs.filter((i: RawInput) => i.batchId === batchId).length;
    if (window.confirm(`确定要删除批次 [${batchId}] 的所有 ${count} 条数据吗？此操作不可恢复。`)) {
      try {
        if (companyId) {
            await taxService.deleteBatch(batchId);
            onDataChange();
        } else {
            // Fallback for local mode or error
             alert("无法删除：企业ID缺失");
        }
      } catch (error) {
        console.error("Delete batch error:", error);
        alert("删除失败，请重试");
      }
    }
  };

  const handleExportBatch = (batchId: string) => {
    const dataToExport = calculatedData.filter((d: CalculatedTaxRecord) => d.batchId === batchId);
    if (dataToExport.length === 0) return;

    const exportData = dataToExport.map((item: CalculatedTaxRecord) => ({
      '批次号': item.batchId || '-',
      '支付日期': item.date,
      '姓名': item.name,
      '身份证号': item.idNumber,
      '用户编码': item.employeeCode || '-',
      '收入金额': item.income,
      '支付月份': item.paymentMonth,
      '连续月份': item.continuousMonthsCount,
      '连续阶段累计收入': item.segmentCumulativeIncome,
      '累计应纳税所得额': item.segmentCumulativeTaxableIncome,
      '预扣率': item.taxRate,
      '速算扣除数': item.quickDeduction,
      '连续阶段内应纳税额': item.segmentTotalTax,
      '连续阶段内已扣税额': item.segmentPriorTaxPaid,
      '本期预扣税额': item.currentTax,
      '税后应付金额': item.afterTaxIncome
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, "计算明细");
    XLSX.writeFile(wb, `个税智算_批次${batchId}.xlsx`);
  };

  return (
    <div className="space-y-6">


      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">批次号</th>
                <th className="px-6 py-4">上传时间 (解析)</th>
                <th className="px-6 py-4">数据笔数</th>
                <th className="px-6 py-4">发放总额</th>
                <th className="px-6 py-4">代扣个税总额</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {batchStats.map((batch: any) => {
                // Parse batch ID YYYYMMDD-HHmmss for display
                const dateStr = batch.id.length >= 15 
                  ? `${batch.id.substring(0,4)}-${batch.id.substring(4,6)}-${batch.id.substring(6,8)} ${batch.id.substring(9,11)}:${batch.id.substring(11,13)}`
                  : batch.id;

                return (
                  <tr key={batch.id} className="hover:bg-gray-50 group transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-brand-600 bg-brand-50/10">
                      {batch.id}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {dateStr}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{batch.count}</td>
                    <td className="px-6 py-4">¥{batch.income.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 font-bold text-emerald-600">¥{batch.tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => handleExportBatch(batch.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-700 bg-brand-50 border border-brand-200 rounded-md hover:bg-brand-100 transition-colors"
                        >
                          <FileSpreadsheet size={14} /> 导出明细
                        </button>
                        {!readOnly && (
                          <button 
                            onClick={() => handleDeleteBatch(batch.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={14} /> 删除
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {batchStats.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-3">
                      <Archive size={48} className="opacity-20" />
                      <p className="text-base">暂无上传记录</p>
                      <p className="text-xs">在“个税智算”页面导入Excel后，此处将自动生成记录</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryRecords;
