import React, { useMemo, useState, useEffect } from 'react';
import { Users, TrendingUp, FileText, CreditCard, Activity, ArrowUpRight, Building2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RawInput, CalculatedTaxRecord } from '../../types';
import { User, userService } from '../../services/userService';
import { taxService } from '../../services/taxService';

interface WorkbenchProps {
  onNavigate: (tab: string) => void;
}

const SuperAdminWorkbench: React.FC<WorkbenchProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEnterprises: 0,
    activeEnterprises: 0,
    totalRevenue: 0,
    totalTax: 0,
    totalBatches: 0,
    recentActivity: [] as any[],
    chartData: [] as any[]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [users, records] = await Promise.all([
          userService.getUsers(),
          taxService.getRecords()
        ]);

        // Process Users
        const enterprises = users.filter(u => u.role === 'ENTERPRISE_ADMIN');
        const active = enterprises.filter(u => u.status === 'ACTIVE');

        // Process Records
        const totalIncome = records.reduce((sum, r) => sum + Number(r.income || 0), 0);
        const totalTax = records.reduce((sum, r) => sum + Number((r as CalculatedTaxRecord).currentTax || 0), 0);
        
        // Prepare Chart Data (Last 6 Months)
        const chartMap = new Map<string, { name: string; income: number; tax: number }>();
        records.forEach(r => {
            if (!r.date) return;
            const date = new Date(r.date);
            if (isNaN(date.getTime())) return;
            
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            if (!chartMap.has(monthKey)) {
                chartMap.set(monthKey, { name: monthKey, income: 0, tax: 0 });
            }
            
            const entry = chartMap.get(monthKey)!;
            entry.income += Number(r.income || 0);
            entry.tax += Number((r as CalculatedTaxRecord).currentTax || 0);
        });

        // Generate last 6 months keys to ensure continuity
        const now = new Date();
        const chartData = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            const entry = chartMap.get(key) || { name: key, income: 0, tax: 0 };
            chartData.push({
                ...entry,
                // Convert to 'wan' (ten thousand) for display
                income: Number((entry.income / 10000).toFixed(2)),
                tax: Number((entry.tax / 10000).toFixed(2))
            });
        }

        // Unique batches and their metadata
        const batchMap = new Map<string, {
            batchId: string,
            companyId: string,
            date: Date,
            count: number
        }>();

        records.forEach(r => {
            if (!r.batchId) return;
            if (!batchMap.has(r.batchId)) {
                batchMap.set(r.batchId, {
                    batchId: r.batchId,
                    companyId: r.companyId,
                    date: new Date(r.date),
                    count: 0
                });
            }
            batchMap.get(r.batchId)!.count++;
        });

        // Map for Company Names
        const companyMap = new Map(users.map(u => [u.id, u.companyName || u.username]));

        // Recent Activity
        const activity = [
            ...enterprises.map(u => ({
                type: 'register',
                date: new Date(u.createdAt),
                label: `新企业注册: ${u.companyName || u.username}`,
                id: u.id
            })),
            ...Array.from(batchMap.values()).map(batch => {
                const companyName = companyMap.get(batch.companyId) || '未知企业';
                
                // Extract Filename from Batch ID if available (Format: TIMESTAMP_FILENAME)
                let fileName = '未知文件';
                let displayBatchId = batch.batchId;
                
                if (batch.batchId.includes('_')) {
                    const parts = batch.batchId.split('_');
                    if (parts.length >= 2) {
                        // Reconstruct filename (in case it had underscores)
                        fileName = parts.slice(1).join('_');
                        displayBatchId = parts[0];
                    }
                }

                return {
                    type: 'upload',
                    date: batch.date,
                    label: `数据上传: ${companyName} - ${fileName} (批次: ${displayBatchId})`,
                    id: batch.batchId
                };
            })
        ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10); // Show top 10

        setStats({
          totalEnterprises: enterprises.length,
          activeEnterprises: active.length,
          totalRevenue: totalIncome,
          totalTax: totalTax,
          totalBatches: batchMap.size,
          recentActivity: activity,
          chartData: chartData
        });

      } catch (error) {
        console.error("Failed to load workbench data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">加载数据中...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">工作台</h1>
        <p className="text-slate-500 text-sm mt-1">平台运营概况与数据分析汇总</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Building2 size={24} />
            </div>
            <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              +2.5% <ArrowUpRight size={12} className="ml-0.5" />
            </span>
          </div>
          <div className="text-slate-500 text-sm font-medium">入驻企业总数</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{stats.totalEnterprises}</div>
          <div className="text-xs text-slate-400 mt-2">其中活跃企业: {stats.activeEnterprises}</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <FileText size={24} />
            </div>
          </div>
          <div className="text-slate-500 text-sm font-medium">累计处理批次</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{stats.totalBatches}</div>
          <div className="text-xs text-slate-400 mt-2">系统平稳运行中</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <CreditCard size={24} />
            </div>
          </div>
          <div className="text-slate-500 text-sm font-medium">累计薪资流水</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">¥{(stats.totalRevenue / 10000).toFixed(1)}w</div>
          <div className="text-xs text-slate-400 mt-2">数据实时统计</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="text-slate-500 text-sm font-medium">累计个税计算</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">¥{(stats.totalTax / 10000).toFixed(1)}w</div>
          <div className="text-xs text-slate-400 mt-2">精准算法支持</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions / Analysis */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Activity size={20} className="text-slate-400" />
            平台数据趋势
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTax" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`¥${value}w`, '']}
                    labelStyle={{ color: '#64748b', marginBottom: '0.25rem' }}
                />
                <Area type="monotone" dataKey="income" name="薪资流水" stroke="#10b981" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={2} />
                <Area type="monotone" dataKey="tax" name="个税总额" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTax)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
           <h3 className="text-lg font-bold text-slate-900 mb-4">最新动态</h3>
           <div className="space-y-4">
             {stats.recentActivity.length === 0 ? (
                 <div className="text-slate-400 text-sm text-center py-8">暂无动态</div>
             ) : (
                 stats.recentActivity.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0">
                        <div className={`mt-1 w-2 h-2 rounded-full ${item.type === 'register' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                        <div>
                            <div className="text-sm text-slate-800 font-medium">{item.label}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{item.date.toLocaleDateString()} {item.date.toLocaleTimeString()}</div>
                        </div>
                    </div>
                 ))
             )}
           </div>
           <button 
             onClick={() => onNavigate('audit')}
             className="w-full mt-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
           >
             查看全部数据审计
           </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminWorkbench;