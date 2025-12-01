import React, { useState } from 'react';
import { LogOut, FileText, Menu, X, Bell, Users, Share2, Megaphone, ChevronDown, ChevronRight, Layers, LayoutDashboard } from 'lucide-react';
import { RawInput } from '../../types';
import Dashboard from '../Dashboard';
import DataAudit from './DataAudit';
import UserManagement from './UserManagement';
import MarketingMaterials from './ProductOperations/MarketingMaterials';
import NotificationManager from './ProductOperations/NotificationManager';
import SuperAdminWorkbench from './SuperAdminWorkbench';
import { User } from '../../services/userService';

interface SuperAdminDashboardProps {
  onLogout: () => void;
  allInputs: RawInput[];
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: MenuItem[];
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onLogout, allInputs }) => {
  const [activeTab, setActiveTab] = useState<'workbench' | 'users' | 'audit' | 'marketing' | 'notifications'>('workbench');
  const [viewingCompany, setViewingCompany] = useState<{ id: string, name: string, code?: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['operations']); // Default expand for visibility

  const handleViewData = (user: User) => {
    setViewingCompany({ 
      id: user.id, 
      name: user.companyName || 'Unknown Company',
      code: user.companyCode
    });
  };

  // If viewing a specific company's data
  if (viewingCompany) {
    const companyInputs = allInputs.filter(i => i.companyId === viewingCompany.id);
    
    return (
      <div className="relative h-screen">
        <div className="fixed top-0 left-0 right-0 h-10 bg-slate-900 z-50 flex items-center justify-between px-4 text-xs text-white shadow-md">
           <div className="flex items-center gap-2">
             <span className="bg-yellow-500 text-black px-1.5 py-0.5 rounded font-bold">超管视图</span>
             <span>正在查看企业：<strong className="text-yellow-400">{viewingCompany.name}</strong> {viewingCompany.code && <span className="opacity-75">({viewingCompany.code})</span>}</span>
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
             companyName={viewingCompany.name}
             companyCode={viewingCompany.code}
             userRole="super_admin"
             readOnly={true} 
           />
        </div>
      </div>
    );
  }

  const menuItems: MenuItem[] = [
    { id: 'workbench', label: '工作台', icon: LayoutDashboard },
    { id: 'users', label: '账号管理', icon: Users },
    { id: 'audit', label: '数据审计', icon: FileText },
    { 
      id: 'operations', 
      label: '产品运营', 
      icon: Layers,
      children: [
        { id: 'marketing', label: '宣传物料', icon: Megaphone },
        { id: 'notifications', label: '消息通知', icon: Bell }
      ]
    },
  ];

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

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
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedMenus.includes(item.id);
            
            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      toggleMenu(item.id);
                    } else {
                      setActiveTab(item.id as any);
                      setSidebarOpen(false);
                    }
                  }}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group
                    ${isActive && !hasChildren
                      ? 'bg-white text-blue-600 shadow-md translate-x-1' 
                      : 'text-blue-100 hover:bg-blue-500/50 hover:text-white'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={isActive && !hasChildren ? 'text-blue-600' : 'text-blue-300 group-hover:text-white'} />
                    <span>{item.label}</span>
                  </div>
                  {hasChildren && (
                    isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                  )}
                </button>

                {/* Submenu */}
                {hasChildren && isExpanded && (
                  <div className="mt-1 ml-4 space-y-1 border-l border-blue-400/30 pl-2">
                    {item.children!.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = activeTab === child.id;
                      
                      return (
                        <button
                          key={child.id}
                          onClick={() => {
                            setActiveTab(child.id as any);
                            setSidebarOpen(false);
                          }}
                          className={`
                            w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                            ${isChildActive 
                              ? 'bg-white/10 text-white' 
                              : 'text-blue-200 hover:text-white hover:bg-blue-500/30'}
                          `}
                        >
                          <ChildIcon size={18} />
                          <span>{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-500/30 bg-blue-800/20 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg">
              SA
            </div>
            <div>
              <div className="font-medium text-white">Super Admin</div>
              <div className="text-xs text-blue-200">System Controller</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
          >
            <LogOut size={16} />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-50 relative">
        <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
             <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-blue-600">
               <Menu size={24} />
             </button>
             <h2 className="text-xl font-bold text-slate-800">
               {activeTab === 'workbench' ? '工作台' :
                activeTab === 'users' ? '企业账号管理' : 
                activeTab === 'audit' ? '数据审计中心' : 
                (activeTab === 'marketing' || activeTab === 'notifications') ? '产品运营中心' : 'Dashboard'}
             </h2>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full relative">
               <Bell size={20} />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {activeTab === 'workbench' ? (
            <SuperAdminWorkbench onNavigate={(tab) => setActiveTab(tab as any)} />
          ) : activeTab === 'users' ? (
            <UserManagement onViewData={handleViewData} />
          ) : activeTab === 'marketing' ? (
            <MarketingMaterials />
          ) : activeTab === 'notifications' ? (
            <NotificationManager />
          ) : (
            <DataAudit onViewData={(id, name) => setViewingCompany({ id, name: name || '企业数据' })} />
          )}
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
