
import React, { useState, useMemo } from 'react';
import { CalculatedTaxRecord } from '../types';
import { Search, ChevronRight, ArrowLeft, Download, FileSpreadsheet, User, Users, Wallet, Calculator, Calendar, TrendingUp } from 'lucide-react';
import * as XLSX from 'xlsx';

interface PersonnelManagerProps {
  data: CalculatedTaxRecord[];
}

// Define summary type
interface PersonSummary {
  name: string;
  idNumber: string;
  totalIncome: number;
  totalTax: number;
  count: number;
  lastPaymentDate: string;
  records: CalculatedTaxRecord[];
}

const PersonnelManager: React.FC<PersonnelManagerProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [selectedPerson, setSelectedPerson] = useState<PersonSummary | null>(null);

  // Group by Person
  const personnelMap = new Map<string, PersonSummary>();

  data.forEach(record => {
    if (!personnelMap.has(record.idNumber)) {
      personnelMap.set(record.idNumber, {
        name: record.name,
        idNumber: record.idNumber,
        totalIncome: 0,
        totalTax: 0,
        count: 0,
        lastPaymentDate: record.date,
        records: []
      });
    }
    const person = personnelMap.get(record.idNumber)!;
    person.totalIncome += record.income;
    person.totalTax += record.currentTax;
    person.count += 1;
    if (new Date(record.date) > new Date(person.lastPaymentDate)) {
      person.lastPaymentDate = record.date;
    }
    person.records.push(record);
  });

  const personnelList = Array.from(personnelMap.values()).filter(p => 
    p.name.includes(searchTerm) || p.idNumber.includes(searchTerm)
  );

  // Calculate Aggregates
  const { totalWorkers, totalIncome, totalTransactions, avgPerTransaction, avgMonthlyIncome } = useMemo(() => {
    const totalWorkers = personnelList.length;
    const totalIncome = personnelList.reduce((sum, p) => sum + p.totalIncome, 0);
    const totalTransactions = personnelList.reduce((sum, p) => sum + p.count, 0);
    
    // Calculate Total Person-Months (sum of unique months for each person)
    let totalPersonMonths = 0;
    personnelList.forEach(p => {
      const pMonths = new Set<string>();
      p.records.forEach(r => pMonths.add(r.paymentMonth));
      totalPersonMonths += pMonths.size;
    });
    
    const avgPerTransaction = totalTransactions > 0 ? totalIncome / totalTransactions : 0;
    const avgMonthlyIncome = totalPersonMonths > 0 ? totalIncome / totalPersonMonths : 0;

    return { totalWorkers, totalIncome, totalTransactions, avgPerTransaction, avgMonthlyIncome };
  }, [personnelList]);

  const handleViewDetails = (person: PersonSummary) => {
    setSelectedPerson(person);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setSelectedPerson(null);
    setCurrentView('list');
  };

  const handleExportPerson = () => {
    if (!selectedPerson) return;
    const exportData = selectedPerson.records.map(r => ({
       '支付日期': r.date,
       '支付月份': r.paymentMonth,
       '收入金额': r.income,
       '个税金额': r.currentTax,
       '税后收入': r.afterTaxIncome,
       '累计阶段收入': r.segmentCumulativeIncome,
       '阶段已扣税': r.segmentPriorTaxPaid
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, selectedPerson.name);
    XLSX.writeFile(wb, `${selectedPerson.name}_个税明细.xlsx`);
  };

  const handleExportList = () => {
    if (personnelList.length === 0) return;
    const exportData = personnelList.map(p => ({
      '姓名': p.name,
      '身份证号': p.idNumber,
      '累计收入': p.totalIncome,
      '累计个税': p.totalTax,
      '发放笔数': p.count,
      '最近发放日期': p.lastPaymentDate
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, "人员汇总");
    XLSX.writeFile(wb, `人员汇总数据.xlsx`);
  }

  // --- View: Detail Page ---
  if (currentView === 'detail' && selectedPerson) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button 
               onClick={handleBackToList}
               className="p-2 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all text-gray-500 hover:text-gray-900"
             >
               <ArrowLeft size={24} />
             </button>
             <div>
               <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                 {selectedPerson.name}
                 <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded font-mono">
                   {selectedPerson.idNumber}
                 </span>
               </h2>
               <p className="text-gray-500 text-sm mt-1">个人历史收入及纳税明细档案</p>
             </div>
          </div>
          <button 
            onClick={handleExportPerson}
            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Download size={18} /> 导出个人明细
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <p className="text-sm text-gray-500 font-medium">历史累计收入</p>
             <p className="text-3xl font-bold text-gray-900 mt-2">¥{selectedPerson.totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <p className="text-sm text-gray-500 font-medium">历史累计个税</p>
             <p className="text-3xl font-bold text-emerald-600 mt-2">¥{selectedPerson.totalTax.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <p className="text-sm text-gray-500 font-medium">累计发放笔数</p>
             <p className="text-3xl font-bold text-brand-600 mt-2">{selectedPerson.count} <span className="text-sm text-gray-400 font-normal">笔</span></p>
          </div>
        </div>

        {/* Detail Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-800">收入明细记录</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-medium">支付日期</th>
                  <th className="px-6 py-3 font-medium">所属月份</th>
                  <th className="px-6 py-3 text-right font-medium">收入金额</th>
                  <th className="px-6 py-3 text-right font-medium text-emerald-700">本次个税</th>
                  <th className="px-6 py-3 text-right font-medium">税后收入</th>
                  <th className="px-6 py-3 text-right text-gray-500">连续段累计收入</th>
                  <th className="px-6 py-3 text-right text-gray-500">连续段已扣税</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {selectedPerson.records.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-600">{r.date}</td>
                    <td className="px-6 py-4 text-gray-500">{r.paymentMonth}</td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">{r.income.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600">{r.currentTax.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-gray-700">{r.afterTaxIncome.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-gray-400 text-xs bg-gray-50/50">{r.segmentCumulativeIncome.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-gray-400 text-xs bg-gray-50/50">{r.segmentPriorTaxPaid.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // --- View: Summary List Page ---
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-gray-900">人员管理</h2>
           <p className="text-gray-500 text-sm mt-1">人员收入概览与档案查询</p>
        </div>
        <button 
           onClick={handleExportList}
           className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
        >
           <FileSpreadsheet size={18} /> 导出汇总列表
        </button>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
             <div className="flex items-center gap-2 text-gray-500 mb-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Users size={16}/></div>
                <span className="text-sm font-medium">总用工人数</span>
             </div>
             <p className="text-xl font-bold text-gray-900">{totalWorkers}</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
             <div className="flex items-center gap-2 text-gray-500 mb-2">
                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><Wallet size={16}/></div>
                <span className="text-sm font-medium">累计收入金额</span>
             </div>
             <p className="text-xl font-bold text-gray-900">¥{(totalIncome / 10000).toFixed(2)}w</p>
             <p className="text-xs text-gray-400 mt-1">¥{totalIncome.toLocaleString()}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
             <div className="flex items-center gap-2 text-gray-500 mb-2">
                <div className="p-1.5 bg-orange-50 text-orange-600 rounded-lg"><Calculator size={16}/></div>
                <span className="text-sm font-medium">结算笔数</span>
             </div>
             <p className="text-xl font-bold text-gray-900">{totalTransactions}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
             <div className="flex items-center gap-2 text-gray-500 mb-2">
                <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg"><TrendingUp size={16}/></div>
                <span className="text-sm font-medium">笔均收入</span>
             </div>
             <p className="text-xl font-bold text-gray-900">¥{avgPerTransaction.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
             <div className="flex items-center gap-2 text-gray-500 mb-2">
                <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><Calendar size={16}/></div>
                <span className="text-sm font-medium">月均收入</span>
             </div>
             <p className="text-xl font-bold text-gray-900">¥{avgMonthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
      </div>

      {/* Search & Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="输入姓名或身份证号搜索..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-500">
          共 <span className="font-bold text-gray-900">{personnelList.length}</span> 人
        </div>
      </div>

      {/* Main List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">姓名</th>
                <th className="px-6 py-4">身份证号</th>
                <th className="px-6 py-4 text-right">历史累计收入</th>
                <th className="px-6 py-4 text-right">历史累计个税</th>
                <th className="px-6 py-4 text-center">发放笔数</th>
                <th className="px-6 py-4">最近发放日期</th>
                <th className="px-6 py-4 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {personnelList.map((person) => (
                <tr key={person.idNumber} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-bold">
                        {person.name.substring(0, 1)}
                      </div>
                      <span className="font-medium text-gray-900">{person.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-500">{person.idNumber}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">¥{person.totalIncome.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-medium text-emerald-600">¥{person.totalTax.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-gray-100 text-gray-700 py-1 px-2.5 rounded-full text-xs font-medium">
                      {person.count}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{person.lastPaymentDate}</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleViewDetails(person)}
                      className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-800 font-medium text-sm px-3 py-1.5 rounded hover:bg-brand-50 transition-colors"
                    >
                      查看明细 <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {personnelList.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <User size={48} className="opacity-20" />
                      <p>未找到匹配的人员数据</p>
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

export default PersonnelManager;
