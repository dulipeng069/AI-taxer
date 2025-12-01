import React, { useMemo, useState, useEffect } from 'react';
import { RawInput, CalculatedTaxRecord } from '../../types';
import { userService, User } from '../../services/userService';
import { taxService } from '../../services/taxService';
import { 
  FileSpreadsheet, Building2, Eye, Loader2, ChevronDown, ChevronRight, 
  TrendingUp, CreditCard, Calendar, Users, FileText, PieChart 
} from 'lucide-react';

interface DataAuditProps {
  onViewData: (companyId: string, companyName?: string) => void;
}

interface CompanyStats {
  user: User;
  batchCount: number;
  totalIncome: number;
  totalTax: number;
  lastUploadDate: Date | null;
  batches: BatchStat[];
  records: CalculatedTaxRecord[];
}

interface BatchStat {
  batchId: string;
  count: number;
  income: number;
  tax: number;
  uploadDate: string;
}

type TabType = 'batches' | 'tax' | 'personnel' | 'reports';

const DataAudit: React.FC<DataAuditProps> = ({ onViewData }) => {
  const [inputs, setInputs] = useState<RawInput[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('batches');

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const [taxData, userData] = await Promise.all([
            taxService.getRecords(),
            userService.getUsers()
        ]);
        setInputs(taxData);
        setUsers(userData);
      } catch (error) {
        console.error('Failed to fetch audit data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // Aggregate data by company first
  const companyStats = useMemo(() => {
    const stats = new Map<string, CompanyStats>();

    // Initialize all enterprise users
    users.filter(u => u.role === 'ENTERPRISE_ADMIN').forEach(user => {
      stats.set(user.id, {
        user,
        batchCount: 0,
        totalIncome: 0,
        totalTax: 0,
        lastUploadDate: null,
        batches: [],
        records: []
      });
    });

    // Process records
    inputs.forEach(input => {
      if (!stats.has(input.companyId)) {
        return; 
      }
      
      const companyStat = stats.get(input.companyId)!;
      const record = input as CalculatedTaxRecord;
      
      // Store raw record
      companyStat.records.push(record);
      
      // Update totals
      companyStat.totalIncome += input.income;
      const tax = record.currentTax || 0;
      companyStat.totalTax += tax;

      // Track batch info
      if (input.batchId) {
        let batch = companyStat.batches.find(b => b.batchId === input.batchId);
        if (!batch) {
          batch = {
            batchId: input.batchId,
            count: 0,
            income: 0,
            tax: 0,
            uploadDate: input.date
          };
          companyStat.batches.push(batch);
        }
        batch.count += 1;
        batch.income += input.income;
        batch.tax += tax;

        // Update last upload date
        const recordDate = new Date(input.date);
        if (!companyStat.lastUploadDate || recordDate > companyStat.lastUploadDate) {
          companyStat.lastUploadDate = recordDate;
        }
      }
    });

    // Sort batches by date desc
    stats.forEach(stat => {
      stat.batches.sort((a, b) => b.batchId.localeCompare(a.batchId));
      stat.batchCount = stat.batches.length;
      // Sort records by date desc
      stat.records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    // Convert to array and sort by last upload date desc
    return Array.from(stats.values()).sort((a, b) => {
      if (!a.lastUploadDate) return 1;
      if (!b.lastUploadDate) return -1;
      return b.lastUploadDate.getTime() - a.lastUploadDate.getTime();
    });
  }, [inputs, users]);

  const toggleExpand = (companyId: string) => {
    if (expandedCompanyId === companyId) {
      setExpandedCompanyId(null);
    } else {
      setExpandedCompanyId(companyId);
      setActiveTab('batches'); // Reset tab on open
    }
  };

  // Render Content based on Active Tab
  const renderTabContent = (stat: CompanyStats) => {
    switch (activeTab) {
      case 'batches':
        return (
          <div>
             <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <FileSpreadsheet size={16} className="text-slate-500" />
                批次记录明细
            </h4>
            {stat.batches.length > 0 ? (
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs">
                            <tr>
                                <th className="px-4 py-3">文件名/批次号</th>
                                <th className="px-4 py-3">上传日期</th>
                                <th className="px-4 py-3">数据笔数</th>
                                <th className="px-4 py-3">薪资总额</th>
                                <th className="px-4 py-3">个税总额</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {stat.batches.map(batch => {
                                const hasFile = batch.batchId.includes('_');
                                const parts = hasFile ? batch.batchId.split('_') : [];
                                const fileName = hasFile ? parts.slice(1).join('_') : batch.batchId;
                                const batchTime = hasFile ? parts[0] : '';

                                return (
                                <tr key={batch.batchId} className="hover:bg-slate-50">
                                    <td className="px-4 py-3">
                                        {hasFile ? (
                                            <div>
                                                <div className="font-medium text-slate-900">{fileName}</div>
                                                <div className="text-xs text-slate-500 font-mono">{batchTime}</div>
                                            </div>
                                        ) : (
                                            <div className="font-mono text-blue-600">{batch.batchId}</div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-slate-500">{batch.uploadDate}</td>
                                    <td className="px-4 py-3">{batch.count}</td>
                                    <td className="px-4 py-3 font-mono">¥{batch.income.toLocaleString()}</td>
                                    <td className="px-4 py-3 font-mono">¥{batch.tax.toLocaleString()}</td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8 bg-white rounded-lg border border-slate-200 text-slate-400 text-sm">
                    该企业暂无上传记录
                </div>
            )}
          </div>
        );
      
      case 'tax':
        return (
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <CreditCard size={16} className="text-slate-500" />
                个税计算记录
            </h4>
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden max-h-96 overflow-y-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-4 py-3">姓名</th>
                            <th className="px-4 py-3">证件号</th>
                            <th className="px-4 py-3">所得月份</th>
                            <th className="px-4 py-3">收入额</th>
                            <th className="px-4 py-3">应纳税额</th>
                            <th className="px-4 py-3">实发工资</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {stat.records.slice(0, 100).map((record, idx) => (
                            <tr key={`${record.id}_${idx}`} className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium">{record.name}</td>
                                <td className="px-4 py-3 font-mono text-slate-500 text-xs">{record.idNumber}</td>
                                <td className="px-4 py-3 text-slate-500">{record.paymentMonth || record.date?.substring(0, 7)}</td>
                                <td className="px-4 py-3 font-mono">¥{record.income.toLocaleString()}</td>
                                <td className="px-4 py-3 font-mono text-orange-600">¥{(record.currentTax || 0).toLocaleString()}</td>
                                <td className="px-4 py-3 font-mono text-emerald-600">¥{((record.income || 0) - (record.currentTax || 0)).toLocaleString()}</td>
                            </tr>
                        ))}
                        {stat.records.length === 0 && (
                           <tr><td colSpan={6} className="p-8 text-center text-slate-400">暂无计算记录</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            {stat.records.length > 100 && (
              <div className="text-xs text-center text-slate-400 mt-2">仅显示最近 100 条记录</div>
            )}
          </div>
        );

      case 'personnel':
        // Deduplicate personnel
        const personnel = Array.from(new Map(
          stat.records.map(r => [r.idNumber, {
            name: r.name,
            idNumber: r.idNumber,
            lastDate: r.date
          }])
        ).values());

        return (
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Users size={16} className="text-slate-500" />
                人员管理 ({personnel.length}人)
            </h4>
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden max-h-96 overflow-y-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-4 py-3">姓名</th>
                            <th className="px-4 py-3">证件号码</th>
                            <th className="px-4 py-3">最近发薪日期</th>
                            <th className="px-4 py-3">状态</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {personnel.map((p, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium">{p.name}</td>
                                <td className="px-4 py-3 font-mono text-slate-500">{p.idNumber}</td>
                                <td className="px-4 py-3 text-slate-500">{p.lastDate}</td>
                                <td className="px-4 py-3">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    在职
                                  </span>
                                </td>
                            </tr>
                        ))}
                        {personnel.length === 0 && (
                           <tr><td colSpan={4} className="p-8 text-center text-slate-400">暂无人员信息</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
          </div>
        );

      case 'reports':
        // Group by month
        const reports = Array.from(
          stat.records.reduce((map, r) => {
            const month = r.paymentMonth || r.date?.substring(0, 7) || 'Unknown';
            if (!map.has(month)) {
              map.set(month, { month, income: 0, tax: 0, count: 0, people: new Set() });
            }
            const entry = map.get(month)!;
            entry.income += r.income || 0;
            entry.tax += r.currentTax || 0;
            entry.count += 1;
            entry.people.add(r.idNumber);
            return map;
          }, new Map<string, { month: string, income: number, tax: number, count: number, people: Set<string> }>()).values()
        ).sort((a, b) => b.month.localeCompare(a.month));

        return (
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <FileText size={16} className="text-slate-500" />
                申报报表
            </h4>
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs">
                        <tr>
                            <th className="px-4 py-3">申报月份</th>
                            <th className="px-4 py-3">申报人数</th>
                            <th className="px-4 py-3">申报总收入</th>
                            <th className="px-4 py-3">应缴个税</th>
                            <th className="px-4 py-3">状态</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {reports.map((r, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-mono font-medium text-blue-600">{r.month}</td>
                                <td className="px-4 py-3">{r.people.size}人 ({r.count}笔)</td>
                                <td className="px-4 py-3 font-mono">¥{r.income.toLocaleString()}</td>
                                <td className="px-4 py-3 font-mono text-orange-600">¥{r.tax.toLocaleString()}</td>
                                <td className="px-4 py-3">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                    已申报
                                  </span>
                                </td>
                            </tr>
                        ))}
                        {reports.length === 0 && (
                           <tr><td colSpan={5} className="p-8 text-center text-slate-400">暂无申报记录</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-2 text-slate-600">加载数据中...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">数据审计</h1>
        <p className="text-slate-500 text-sm mt-1">查看所有企业的运营数据汇总及上传记录</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4 w-10"></th>
                <th className="px-6 py-4">企业名称 / 编码</th>
                <th className="px-6 py-4">累计批次</th>
                <th className="px-6 py-4">累计发放薪资</th>
                <th className="px-6 py-4">累计个税</th>
                <th className="px-6 py-4">最近活跃</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {companyStats.map((stat) => {
                const isExpanded = expandedCompanyId === stat.user.id;
                return (
                  <React.Fragment key={stat.user.id}>
                    <tr 
                      className={`hover:bg-slate-50 transition-colors cursor-pointer ${isExpanded ? 'bg-blue-50/50' : ''}`}
                      onClick={() => toggleExpand(stat.user.id)}
                    >
                      <td className="px-6 py-4 text-slate-400">
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Building2 size={18} />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{stat.user.companyName || '未知企业'}</div>
                            <div className="text-xs text-slate-500 font-mono">{stat.user.companyCode || stat.user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">{stat.batchCount}</td>
                      <td className="px-6 py-4 font-mono text-slate-600">¥{(stat.totalIncome / 10000).toFixed(2)}w</td>
                      <td className="px-6 py-4 font-mono text-slate-600">¥{(stat.totalTax / 10000).toFixed(2)}w</td>
                      <td className="px-6 py-4 text-slate-500">
                        {stat.lastUploadDate ? stat.lastUploadDate.toLocaleDateString() : '无记录'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewData(stat.user.id, stat.user.companyName);
                          }}
                          className="text-blue-600 hover:text-blue-700 font-medium text-xs border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded-lg transition-colors bg-white"
                        >
                          进入企业视图
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expanded Content (Secondary Fields / Summary) */}
                    {isExpanded && (
                      <tr className="bg-slate-50/50">
                        <td colSpan={7} className="px-6 py-6 shadow-inner">
                          <div className="ml-10 space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                            
                            {/* Enterprise Backend Summary Data Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-2 text-slate-500 mb-2 text-xs font-medium uppercase tracking-wider">
                                        <CreditCard size={14} /> 累计薪资发放
                                    </div>
                                    <div className="text-xl font-bold text-slate-900">¥{stat.totalIncome.toLocaleString()}</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-2 text-slate-500 mb-2 text-xs font-medium uppercase tracking-wider">
                                        <TrendingUp size={14} /> 累计个税缴纳
                                    </div>
                                    <div className="text-xl font-bold text-slate-900">¥{stat.totalTax.toLocaleString()}</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-2 text-slate-500 mb-2 text-xs font-medium uppercase tracking-wider">
                                        <Calendar size={14} /> 最近上传时间
                                    </div>
                                    <div className="text-xl font-bold text-slate-900">
                                        {stat.lastUploadDate ? stat.lastUploadDate.toLocaleDateString() : '暂无'}
                                    </div>
                                </div>
                            </div>

                            {/* Module Tabs */}
                            <div className="border-b border-slate-200">
                                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                    <button
                                        onClick={() => setActiveTab('batches')}
                                        className={`${activeTab === 'batches' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                                    >
                                        <FileSpreadsheet size={16} />
                                        批次记录
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('tax')}
                                        className={`${activeTab === 'tax' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                                    >
                                        <CreditCard size={16} />
                                        个税计算记录
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('personnel')}
                                        className={`${activeTab === 'personnel' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                                    >
                                        <Users size={16} />
                                        人员管理
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('reports')}
                                        className={`${activeTab === 'reports' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                                    >
                                        <FileText size={16} />
                                        申报报表
                                    </button>
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div className="mt-4">
                                {renderTabContent(stat)}
                            </div>

                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              
              {companyStats.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    暂无企业入驻
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

export default DataAudit;
