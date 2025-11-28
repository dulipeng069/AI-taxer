import React, { useMemo } from 'react';
import { RawInput, EnterpriseAccount } from '../../types';
import { authService } from '../../services/authService';
import { FileSpreadsheet, Building2, Calendar, Eye } from 'lucide-react';
import { processTaxRecords } from '../../services/taxCalculator';

interface DataAuditProps {
  onViewData: (companyId: string) => void;
}

const DataAudit: React.FC<DataAuditProps> = ({ onViewData }) => {
  const inputs = authService.getAllInputs();
  const enterprises = authService.getEnterprises();

  // Aggregate data by batch and company
  const batchStats = useMemo(() => {
    const stats = new Map<string, { 
      batchId: string; 
      companyId: string; 
      companyName: string;
      count: number; 
      income: number; 
      tax: number; 
      uploadDate: string;
    }>();

    // Group by companyId + batchId to be safe
    inputs.forEach(input => {
      if (!input.batchId) return;
      const key = `${input.companyId}_${input.batchId}`;
      
      if (!stats.has(key)) {
        const ent = enterprises.find(e => e.id === input.companyId);
        stats.set(key, {
          batchId: input.batchId,
          companyId: input.companyId,
          companyName: ent ? ent.companyName : '未知企业',
          count: 0,
          income: 0,
          tax: 0,
          uploadDate: input.date // Approximate
        });
      }
      
      const current = stats.get(key)!;
      current.count += 1;
      current.income += input.income;
    });

    // Calculate tax for each batch (expensive but necessary for audit)
    // Actually, processTaxRecords processes ALL inputs. 
    // It might be better to just show income sum here to avoid re-calculating everything for the summary view.
    // Or we can do a quick calc.
    // Let's just show Income for now to keep it fast, or if we want tax, we need to run calculator.
    // The user asked for "View data uploaded".
    
    return Array.from(stats.values()).sort((a, b) => b.batchId.localeCompare(a.batchId));
  }, [inputs, enterprises]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">数据审计</h1>
        <p className="text-slate-500 text-sm mt-1">查看所有企业上传的薪资数据批次记录</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4">企业名称</th>
              <th className="px-6 py-4">批次号</th>
              <th className="px-6 py-4">数据笔数</th>
              <th className="px-6 py-4">发放总额</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {batchStats.map((batch) => (
              <tr key={`${batch.companyId}_${batch.batchId}`} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-slate-400" />
                    {batch.companyName}
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-slate-600">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet size={16} className="text-emerald-500" />
                    {batch.batchId}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{batch.count}</td>
                <td className="px-6 py-4 font-mono">¥{batch.income.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onViewData(batch.companyId)}
                    className="flex items-center gap-1.5 ml-auto text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Eye size={16} /> 查看详情
                  </button>
                </td>
              </tr>
            ))}
            {batchStats.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  暂无数据上传记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataAudit;
