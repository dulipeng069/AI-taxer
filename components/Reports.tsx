import React, { useState } from 'react';
import { CalculatedTaxRecord } from '../types';
import { Calendar, Download, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ReportsProps {
  data: CalculatedTaxRecord[];
}

const Reports: React.FC<ReportsProps> = ({ data }) => {
  // Get all unique months
  const months = (Array.from(new Set(data.map(d => d.paymentMonth))) as string[]).sort().reverse();
  const [selectedMonth, setSelectedMonth] = useState<string>(months[0] || '');

  // Filter data for month
  const monthData = data.filter(d => d.paymentMonth === selectedMonth);

  // Aggregate by person for this month (in case someone was paid twice in a month)
  const reportRowsMap = new Map<string, {
     name: string;
     idNumber: string;
     totalIncome: number;
     totalTax: number;
     afterTax: number;
     count: number;
     cumulativeIncome: number;
     cumulativeTaxable: number;
     cumulativeTax: number;
     priorTax: number;
     deduction: number;
     taxRate: number;
     quickDeduction: number;
  }>();

  monthData.forEach(d => {
     if (!reportRowsMap.has(d.idNumber)) {
        reportRowsMap.set(d.idNumber, {
           name: d.name,
           idNumber: d.idNumber,
           totalIncome: 0,
           totalTax: 0,
           afterTax: 0,
           count: 0,
           cumulativeIncome: 0,
           cumulativeTaxable: 0,
           cumulativeTax: 0,
           priorTax: 0,
           deduction: 0,
           taxRate: 0,
           quickDeduction: 0
        });
     }
     const row = reportRowsMap.get(d.idNumber)!;
     row.totalIncome += d.income;
     row.totalTax += d.currentTax;
     row.afterTax += d.afterTaxIncome;
     row.count += 1;
     // Update with latest cumulative status for this month
     row.cumulativeIncome = d.segmentCumulativeIncome;
     row.cumulativeTaxable = d.segmentCumulativeTaxableIncome;
     row.cumulativeTax = d.segmentTotalTax;
     row.priorTax = d.segmentPriorTaxPaid;
     row.deduction = d.segmentCumulativeIncome - d.segmentCumulativeTaxableIncome;
     row.taxRate = d.taxRate;
     row.quickDeduction = d.quickDeduction;
  });

  const reportRows = Array.from(reportRowsMap.values());

  const totalIncome = reportRows.reduce((a, b) => a + b.totalIncome, 0);
  const totalTax = reportRows.reduce((a, b) => a + b.totalTax, 0);

  const handleDownload = () => {
    const exportData = reportRows.map(r => ({
       '姓名': r.name,
       '身份证号': r.idNumber,
       '本月收入总额': r.totalIncome,
       '累计收入': r.cumulativeIncome,
       '累计减除费用': r.deduction,
       '累计应纳税所得额': r.cumulativeTaxable,
       '预扣率': `${(r.taxRate * 100).toFixed(0)}%`,
       '速算扣除数': r.quickDeduction,
       '累计应纳税额': r.cumulativeTax,
       '已预缴税额': r.priorTax,
       '本月扣缴个税': r.totalTax,
       '本月实发金额': r.afterTax,
       '发放笔数': r.count
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, `${selectedMonth}申报表`);
    XLSX.writeFile(wb, `个税申报表_${selectedMonth}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-gray-900">申报报表</h2>
           <p className="text-gray-500 text-sm mt-1">按月度汇总个税申报数据</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
             <Calendar size={18} className="text-gray-500"/>
             <select 
               value={selectedMonth} 
               onChange={e => setSelectedMonth(e.target.value)}
               className="bg-transparent outline-none text-sm font-medium text-gray-700"
             >
                {months.map(m => (
                  <option key={m} value={m}>{m.substring(0,4)}年{m.substring(4)}月</option>
                ))}
             </select>
           </div>
           <button 
             onClick={handleDownload}
             className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
           >
             <Download size={18} /> 下载申报表
           </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
           <p className="text-blue-600 text-sm font-medium mb-1">本月申报总人数</p>
           <p className="text-3xl font-bold text-gray-900">{reportRows.length}</p>
        </div>
        <div className="bg-white border border-gray-200 p-6 rounded-xl">
           <p className="text-gray-500 text-sm font-medium mb-1">本月发放总额</p>
           <p className="text-3xl font-bold text-gray-900">¥{totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl">
           <p className="text-emerald-700 text-sm font-medium mb-1">本月应代扣个税</p>
           <p className="text-3xl font-bold text-emerald-600">¥{totalTax.toLocaleString()}</p>
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[1400px]">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 sticky left-0 bg-gray-50 z-10 shadow-sm">姓名</th>
                <th className="px-6 py-4">身份证号</th>
                <th className="px-6 py-4 text-center">发放笔数</th>
                <th className="px-6 py-4 text-right">本月收入</th>
                <th className="px-6 py-4 text-right bg-blue-50/50">累计收入</th>
                <th className="px-6 py-4 text-right">累计减除费用</th>
                <th className="px-6 py-4 text-right">累计应纳税所得额</th>
                <th className="px-6 py-4 text-center">预扣率</th>
                <th className="px-6 py-4 text-right">速算扣除数</th>
                <th className="px-6 py-4 text-right">累计应纳税额</th>
                <th className="px-6 py-4 text-right">已预缴税额</th>
                <th className="px-6 py-4 text-right font-bold text-emerald-700 bg-emerald-50/50">本月扣缴个税</th>
                <th className="px-6 py-4 text-right">本月实发</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reportRows.map(row => (
                <tr key={row.idNumber} className="hover:bg-gray-50">
                   <td className="px-6 py-3 font-medium text-gray-900 sticky left-0 bg-white z-10 shadow-sm group-hover:bg-gray-50">{row.name}</td>
                   <td className="px-6 py-3 font-mono text-gray-500">{row.idNumber}</td>
                   <td className="px-6 py-3 text-center">{row.count}</td>
                   <td className="px-6 py-3 text-right font-medium">{row.totalIncome.toLocaleString()}</td>
                   <td className="px-6 py-3 text-right text-blue-600 bg-blue-50/10 font-medium">{row.cumulativeIncome.toLocaleString()}</td>
                   <td className="px-6 py-3 text-right text-gray-500">{row.deduction.toLocaleString()}</td>
                   <td className="px-6 py-3 text-right text-gray-900">{row.cumulativeTaxable.toLocaleString()}</td>
                   <td className="px-6 py-3 text-center">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold">
                         {(row.taxRate * 100).toFixed(0)}%
                      </span>
                   </td>
                   <td className="px-6 py-3 text-right text-gray-500">{row.quickDeduction.toLocaleString()}</td>
                   <td className="px-6 py-3 text-right text-gray-700">{row.cumulativeTax.toLocaleString()}</td>
                   <td className="px-6 py-3 text-right text-gray-500">{row.priorTax.toLocaleString()}</td>
                   <td className="px-6 py-3 text-right font-bold text-emerald-600 bg-emerald-50/10">{row.totalTax.toLocaleString()}</td>
                   <td className="px-6 py-3 text-right text-gray-900">{row.afterTax.toLocaleString()}</td>
                </tr>
              ))}
              {reportRows.length === 0 && (
                 <tr>
                   <td colSpan={13} className="px-6 py-12 text-center text-gray-400">
                     <div className="flex flex-col items-center">
                       <FileText size={48} className="mb-2 opacity-20" />
                       该月无数据
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

export default Reports;