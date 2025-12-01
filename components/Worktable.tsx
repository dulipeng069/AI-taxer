import React from 'react';
import { CalculatedTaxRecord } from '../types';
import { Wallet, Users, Banknote, TrendingUp, Clock, Calculator, FileText, History, ArrowRight, ShieldCheck, Zap, PieChart } from 'lucide-react';

interface WorktableProps {
  data: CalculatedTaxRecord[];
  onNavigate: (tabId: string) => void;
}

const Worktable: React.FC<WorktableProps> = ({ data, onNavigate }) => {
  // Aggregate Data
  const totalPayout = data.reduce((acc, curr) => acc + curr.income, 0);
  const totalTax = data.reduce((acc, curr) => acc + curr.currentTax, 0);
  const totalAfterTax = totalPayout - totalTax;
  const uniquePeople = new Set(data.map(d => d.idNumber)).size;
  
  // Calculate Average Tax Rate
  const avgTaxRate = totalPayout > 0 ? (totalTax / totalPayout) * 100 : 0;

  // Recent Activity (Last 8 records)
  const recentRecords = [...data].reverse().slice(0, 8);

  const QuickActionCard = ({ icon: Icon, title, desc, colorClass, target }: any) => (
    <button 
      onClick={() => onNavigate(target)}
      className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left group w-full"
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${colorClass}`}>
        <Icon size={20} />
      </div>
      <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors flex items-center gap-2">
        {title}
        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </h3>
      <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </button>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section Removed - Moved to Dashboard Layout */}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard 
          icon={Calculator} 
          title="个税智算" 
          desc="导入Excel批量计算" 
          colorClass="bg-brand-50 text-brand-600"
          target="calculation"
        />
        <QuickActionCard 
          icon={Users} 
          title="人员管理" 
          desc="查看人员档案与汇总" 
          colorClass="bg-blue-50 text-blue-600"
          target="personnel"
        />
        <QuickActionCard 
          icon={FileText} 
          title="申报报表" 
          desc="生成月度申报数据" 
          colorClass="bg-purple-50 text-purple-600"
          target="reports"
        />
        <QuickActionCard 
          icon={History} 
          title="历史记录" 
          desc="查询过往计算批次" 
          colorClass="bg-orange-50 text-orange-600"
          target="history"
        />
      </div>

      {/* Main Stats Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Key Metrics */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Wallet size={120} />
               </div>
               <p className="text-brand-100 font-medium mb-1">累计发放总额</p>
               <h3 className="text-3xl font-bold">¥ {totalPayout.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</h3>
               <div className="mt-6 flex items-center gap-4 text-sm text-brand-100">
                  <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                     <Users size={14} />
                     <span>{uniquePeople} 人</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                     <Clock size={14} />
                     <span>{data.length} 笔</span>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
               <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-500 font-medium">累计代扣个税</p>
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Banknote size={20} />
                  </div>
               </div>
               <h3 className="text-2xl font-bold text-gray-900">¥ {totalTax.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</h3>
               <div className="mt-4 w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${Math.min(avgTaxRate * 5, 100)}%` }}></div>
               </div>
               <p className="text-xs text-gray-400 mt-2 flex justify-between">
                  <span>平均预扣率</span>
                  <span className="font-bold text-gray-700">{avgTaxRate.toFixed(2)}%</span>
               </p>
            </div>
        </div>

        {/* Right: Policy Banner */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4">
               <Zap size={20} className="text-yellow-500 fill-yellow-500" />
               <h3 className="font-bold text-gray-900">2025 新规速递</h3>
            </div>
            <div className="flex-1 space-y-4">
               <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs font-bold text-slate-700 mb-1">国税总局 2025年第 16 号公告</p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                     明确劳务报酬所得采用<span className="text-brand-600 font-bold">累计预扣法</span>，适用 3%-45% 七级累进税率，不再适用 20% 固定比例。
                  </p>
               </div>
               <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs font-bold text-slate-700 mb-1">同人跨月连续段识别</p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                     系统自动识别同一纳税人连续期间的收入，合并计算累计收入与应纳税所得额。
                  </p>
               </div>
            </div>
        </div>

      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
             <Clock size={16} className="text-gray-400" />
             <h3 className="font-semibold text-gray-900">最新个税计算记录</h3>
          </div>
          <button 
            onClick={() => onNavigate('calculation')}
            className="text-sm text-brand-600 hover:text-brand-700 font-medium hover:underline"
          >
            去计算中心查看全部
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-medium">支付日期</th>
                <th className="px-6 py-3 font-medium">姓名</th>
                <th className="px-6 py-3 font-medium text-right">收入金额</th>
                <th className="px-6 py-3 font-medium text-right">本期个税</th>
                <th className="px-6 py-3 font-medium text-right">税后收入</th>
                <th className="px-6 py-3 font-medium text-center">预扣率</th>
                <th className="px-6 py-3 font-medium text-center">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentRecords.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-600 font-mono text-xs">{item.date}</td>
                  <td className="px-6 py-3 font-medium text-gray-900">
                     <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                           {item.name.charAt(0)}
                        </div>
                        {item.name}
                     </div>
                  </td>
                  <td className="px-6 py-3 text-gray-900 font-medium text-right">¥{item.income.toLocaleString()}</td>
                  <td className="px-6 py-3 text-emerald-600 font-medium text-right">¥{item.currentTax.toLocaleString()}</td>
                  <td className="px-6 py-3 text-gray-900 text-right">¥{item.afterTaxIncome.toLocaleString()}</td>
                  <td className="px-6 py-3 text-gray-400 text-xs text-center">{(item.taxRate * 100).toFixed(0)}%</td>
                  <td className="px-6 py-3 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                       已计算
                    </span>
                  </td>
                </tr>
              ))}
              {recentRecords.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-3">
                       <PieChart size={32} className="opacity-20" />
                       <span>暂无近期记录，请前往“个税智算”导入数据</span>
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

export default Worktable;