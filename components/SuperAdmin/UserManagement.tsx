import React, { useState, useEffect } from 'react';
import { User, userService } from '../../services/userService';
import { Lock, Trash2, Plus, X, UserCheck, Building, Eye, CheckCircle, Clock, Calendar } from 'lucide-react';

interface UserManagementProps {
  onViewData?: (user: User) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onViewData }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<'ALL' | 'SUPER_ADMIN' | 'ENTERPRISE_ADMIN' | 'PENDING'>('ALL');
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  
  // Form States
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'ENTERPRISE_ADMIN',
    companyName: ''
  });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userService.createUser(formData);
      setIsCreateModalOpen(false);
      setFormData({ username: '', password: '', role: 'ENTERPRISE_ADMIN', companyName: '' });
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      await userService.resetPassword(selectedUser.id, newPassword);
      setIsResetPasswordOpen(false);
      setNewPassword('');
      alert('Password updated successfully');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!window.confirm(`确定要删除账号 ${user.username} 吗？此操作不可恢复。`)) return;
    try {
      await userService.deleteUser(user.id);
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleApprove = async (type: 'FREE' | 'PAID') => {
    if (!selectedUser) return;
    
    const now = new Date();
    let validUntil = new Date();
    
    if (type === 'FREE') {
      validUntil.setDate(now.getDate() + 7);
    } else {
      validUntil.setFullYear(now.getFullYear() + 1);
    }

    try {
      await userService.updateUser(selectedUser.id, {
        status: 'ACTIVE',
        subscription: type,
        validUntil: validUntil.toISOString()
      });
      setIsApproveModalOpen(false);
      fetchUsers();
      alert(`已开通${type === 'FREE' ? '免费' : '付费'}权限，有效期至 ${validUntil.toLocaleDateString()}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredUsers = users.filter(user => {
    if (filterRole === 'ALL') return true;
    if (filterRole === 'PENDING') return user.status === 'PENDING_APPROVAL';
    return user.role === filterRole;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">账号管理</h1>
          <p className="text-slate-500">管理所有超级管理员和企业账号</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} />
          新建账号
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex gap-4 overflow-x-auto">
        <button 
          onClick={() => setFilterRole('ALL')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterRole === 'ALL' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          全部账号
        </button>
        <button 
          onClick={() => setFilterRole('PENDING')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${filterRole === 'PENDING' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          <Clock size={16} />
          待审核申请
          {users.filter(u => u.status === 'PENDING_APPROVAL').length > 0 && (
            <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {users.filter(u => u.status === 'PENDING_APPROVAL').length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setFilterRole('SUPER_ADMIN')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${filterRole === 'SUPER_ADMIN' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          <UserCheck size={16} />
          超管人员
        </button>
        <button 
          onClick={() => setFilterRole('ENTERPRISE_ADMIN')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${filterRole === 'ENTERPRISE_ADMIN' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          <Building size={16} />
          企业账号
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-sm font-semibold border-b border-slate-200">
                  <th className="p-4">用户名 / 手机号</th>
                  <th className="p-4">真实姓名</th>
                  <th className="p-4">公司名称</th>
                  <th className="p-4">角色</th>
                  <th className="p-4">状态 / 有效期</th>
                  <th className="p-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800">
                      {user.username}
                      {user.phone && user.username !== user.phone && <div className="text-xs text-slate-400">{user.phone}</div>}
                    </td>
                    <td className="p-4 text-slate-600">{user.realName || '-'}</td>
                    <td className="p-4 text-slate-600">{user.companyName || '-'}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'SUPER_ADMIN' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'SUPER_ADMIN' ? '超级管理员' : '企业管理员'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                          user.status === 'PENDING_APPROVAL' ? 'bg-orange-100 text-orange-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {user.status === 'ACTIVE' ? '正常' : 
                           user.status === 'PENDING_APPROVAL' ? '待审核' : user.status}
                        </span>
                        {user.validUntil && (
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <Calendar size={10} />
                            {new Date(user.validUntil).toLocaleDateString()} 到期
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {user.status === 'PENDING_APPROVAL' ? (
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setIsApproveModalOpen(true);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-bold transition-colors shadow-sm"
                        >
                          审核开通
                        </button>
                      ) : (
                        <>
                           {user.role === 'ENTERPRISE_ADMIN' && (
                            <button 
                              onClick={() => {
                                setSelectedUser(user);
                                setIsApproveModalOpen(true);
                              }}
                              className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                              title="续费/配置权限"
                            >
                              <Clock size={18} />
                            </button>
                           )}
                           {user.role === 'ENTERPRISE_ADMIN' && onViewData && (
                            <button 
                              onClick={() => onViewData(user)}
                              className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                              title="查看数据"
                            >
                              <Eye size={18} />
                            </button>
                          )}
                        </>
                      )}
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          setIsResetPasswordOpen(true);
                        }}
                        className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                        title="重置密码"
                      >
                        <Lock size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="删除账号"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">新建账号</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">用户名</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">密码</label>
                <input 
                  type="password" 
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">角色</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                >
                  <option value="ENTERPRISE_ADMIN">企业管理员</option>
                  <option value="SUPER_ADMIN">超级管理员</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">企业名称</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.companyName}
                  onChange={e => setFormData({...formData, companyName: e.target.value})}
                />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700">
                  创建账号
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {isResetPasswordOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">重置密码 - {selectedUser?.username}</h3>
              <button onClick={() => setIsResetPasswordOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleResetPassword} className="p-6 space-y-4">
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">新密码</label>
                <input 
                  type="password" 
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="输入新密码"
                />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700">
                  确认重置
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Approve / Config Modal */}
      {isApproveModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">配置权限 - {selectedUser.username}</h3>
              <button onClick={() => setIsApproveModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">请选择开通类型</h4>
                <p className="text-slate-500 text-sm">
                  当前申请: {selectedUser.companyName} ({selectedUser.realName})
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleApprove('FREE')}
                  className="p-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
                >
                  <div className="font-bold text-slate-800 group-hover:text-blue-700 mb-1">免费试用</div>
                  <div className="text-xs text-slate-500">有效期 7 天</div>
                </button>
                <button
                  onClick={() => handleApprove('PAID')}
                  className="p-4 border-2 border-slate-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all text-center group"
                >
                  <div className="font-bold text-slate-800 group-hover:text-orange-700 mb-1">付费版</div>
                  <div className="text-xs text-slate-500">有效期 1 年</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
