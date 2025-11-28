import React, { useState, useEffect } from 'react';
import { Plus, Search, CheckCircle2, XCircle, Trash2, Eye, X } from 'lucide-react';
import { authService } from '../../services/authService';
import { EnterpriseAccount } from '../../types';

interface EnterpriseManagerProps {
  onViewData: (ent: EnterpriseAccount) => void;
}

const EnterpriseManager: React.FC<EnterpriseManagerProps> = ({ onViewData }) => {
  const [enterprises, setEnterprises] = useState<EnterpriseAccount[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [newEnt, setNewEnt] = useState({
    companyName: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    loadEnterprises();
  }, []);

  const loadEnterprises = () => {
    setEnterprises(authService.getEnterprises());
  };

  const handleAddEnterprise = (e: React.FormEvent) => {
    e.preventDefault();
    const newAccount: EnterpriseAccount = {
      id: `ent_${Date.now()}`,
      companyName: newEnt.companyName,
      username: newEnt.username,
      password: newEnt.password,
      status: 'active',
      createdAt: Date.now(),
      permissions: ['calculation', 'reports', 'history', 'personnel', 'settings']
    };
    authService.saveEnterprise(newAccount);
    setShowAddModal(false);
    setNewEnt({ companyName: '', username: '', password: '' });
    loadEnterprises();
  };

  const toggleStatus = (ent: EnterpriseAccount) => {
    const updated = { ...ent, status: ent.status === 'active' ? 'disabled' : 'active' } as EnterpriseAccount;
    authService.saveEnterprise(updated);
    loadEnterprises();
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除该企业账号吗？此操作不可恢复。')) {
      authService.deleteEnterprise(id);
      loadEnterprises();
    }
  };

  const filteredEnterprises = enterprises.filter(ent => 
    ent.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ent.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">企业账号管理</h1>
          <p className="text-slate-500 text-sm mt-1">配置企业账号、管理权限及查看数据</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg shadow-sm font-medium transition-all"
        >
          <Plus size={18} /> 新增企业账号
        </button>
      </div>

      {/* Enterprise List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索企业名称或账号..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
            />
          </div>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4">企业名称</th>
              <th className="px-6 py-4">登录账号</th>
              <th className="px-6 py-4">创建时间</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEnterprises.map(ent => (
              <tr key={ent.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">
                      {ent.companyName.substring(0, 1)}
                    </div>
                    {ent.companyName}
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-slate-600">{ent.username}</td>
                <td className="px-6 py-4 text-slate-500">
                  {new Date(ent.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    ent.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${ent.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                    {ent.status === 'active' ? '已启用' : '已停用'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onViewData(ent)}
                      title="查看数据"
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => toggleStatus(ent)}
                      title={ent.status === 'active' ? "停用账号" : "启用账号"}
                      className={`p-1.5 rounded-lg transition-colors ${
                        ent.status === 'active' 
                          ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50' 
                          : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      {ent.status === 'active' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                    </button>
                    <button 
                      onClick={() => handleDelete(ent.id)}
                      title="删除账号"
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {enterprises.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            暂无企业账号，请点击右上角新增
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900">新增企业账号</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddEnterprise} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">企业名称</label>
                <input 
                  type="text" 
                  required
                  value={newEnt.companyName}
                  onChange={e => setNewEnt({...newEnt, companyName: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                  placeholder="例如：北京某某科技有限公司"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">登录账号</label>
                <input 
                  type="text" 
                  required
                  value={newEnt.username}
                  onChange={e => setNewEnt({...newEnt, username: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                  placeholder="用于登录系统的用户名"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">初始密码</label>
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    value={newEnt.password}
                    onChange={e => setNewEnt({...newEnt, password: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-mono"
                    placeholder="设置初始登录密码"
                  />
                </div>
              </div>
              
              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
                >
                  确认创建
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnterpriseManager;
