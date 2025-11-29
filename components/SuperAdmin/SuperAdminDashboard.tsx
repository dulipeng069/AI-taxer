import React, { useState } from 'react';
import { LogOut, FileText, Menu, X, Bell, Users, Share2, Megaphone } from 'lucide-react';
import { RawInput } from '../../types';
import Dashboard from '../Dashboard';
import DataAudit from './DataAudit';
import UserManagement from './UserManagement';
import MarketingMaterials from './ProductOperations/MarketingMaterials';
import { User } from '../../services/userService';

interface SuperAdminDashboardProps {
  onLogout: () => void;
  allInputs: RawInput[];
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onLogout, allInputs }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'audit' | 'marketing'>('users');
  const [viewingCompany, setViewingCompany] = useState<{ id: string, name: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleViewData = (user: User) => {
    setViewingCompany({ id: user.id, name: user.companyName || 'Unknown Company' });
  };

  // If viewing a specific company's data
  if (viewingCompany) {
    const companyInputs = allInputs.filter(i => i.companyId === viewingCompany.id);
    
    return (
      <div className="relative h-screen">
        <div className="fixed top-0 left-0 right-0 h-10 bg-slate-900 z-50 flex items-center justify-between px-4 text-xs text-white shadow-md">
           <div className="flex items-center gap-2">
             <span className="bg-yellow-500 text-black px-1.5 py-0.5 rounded font-bold">超管视图</span>
             <span>正在查看企业：<strong className="text-yellow-400">{viewingCompany.name}</strong></span>
           </div>
           <button 
             onClick={() => setViewingCompany(null)}
             className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors"
           >
             退出查看
           </button>
        </div>
        <div className="pt-10 h-full">
           <Dashboard 
             onLogout={() => {}} 
             companyId={viewingCompany.id}
             userRole="super_admin"
             readOnly={true} 
           />
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'users', label: '账号管理', icon: Users },
    { id: 'audit', label: '数据审计', icon: FileText },
    { id: 'marketing', label: '宣传物料', icon: Megaphone, category: '产品运营' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-800">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-blue-600 to-blue-700 shadow-xl transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-blue-500/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-blue-600">TM</div>
            <span className="text-xl font-bold tracking-tight text-white">TaxMaster</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-blue-200 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const showCategory = item.category && (index === 0 || menuItems[index - 1].category !== item.category);
            
            return (
              <React.Fragment key={item.id}>
                {showCategory && (
                  <div className="mt-4 mb-2 px-4 text-xs font-semibold text-blue-200 uppercase tracking-wider">
                    {item.category}
                  </div>
                )}
                <button
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all
                    ${isActive 
                      ? 'bg-white text-blue-600 shadow-md' 
                      : 'text-blue-100 hover:bg-blue-500/50 hover:text-white'
                    }`}
                >
                  <Icon size={20} className={isActive ? 'text-blue-600' : 'text-blue-200 group-hover:text-white'} />
                  {item.label}
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-blue-500/30">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-blue-200 hover:text-white hover:bg-blue-500/50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            退出登录
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 h-16 flex items-center justify-between px-6 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500 mr-4">
            <Menu size={24} />
          </button>
          
          <h1 className="text-lg font-semibold text-slate-900">
             {menuItems.find(m => m.id === activeTab)?.label}
          </h1>

          <div className="flex items-center gap-6">
            <button className="relative p-1 text-slate-400 hover:text-slate-500">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                SA
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium text-slate-700">Super Admin</p>
                <p className="text-slate-500 text-xs">系统管理员</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-8 bg-slate-100">
          {activeTab === 'users' ? (
            <UserManagement onViewData={handleViewData} />
          ) : activeTab === 'marketing' ? (
            <MarketingMaterials />
          ) : (
            <DataAudit onViewData={(id) => {
               // DataAudit might still pass string ID, let's handle it if needed.
               // Actually DataAudit passes string ID in previous code.
               // We need to fetch user name if we want to display it.
               // For now, let's just use 'Unknown Company' or pass empty name.
               setViewingCompany({ id, name: '企业数据' });
            }} />
          )}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
