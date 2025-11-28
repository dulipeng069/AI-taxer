
import React, { useState, useMemo, useEffect } from 'react';
import { LayoutDashboard, Users, Calculator, FileText, Settings as SettingsIcon, LogOut, Menu, X, Bell, History } from 'lucide-react';
import TaxTable from './TaxTable';
import Worktable from './Worktable';
import PersonnelManager from './PersonnelManager';
import Reports from './Reports';
import Settings from './Settings';
import HistoryRecords from './HistoryRecords';
import { RawInput, UserSettings } from '../types';
import { processTaxRecords } from '../services/taxCalculator';
import { authService } from '../services/authService';

interface DashboardProps {
  onLogout: () => void;
  companyId?: string;
  userRole?: string;
  inputs: RawInput[];
  onUpdateInputs: (inputs: RawInput[]) => void;
  readOnly?: boolean;
  permissions?: string[];
}

// Initial Settings
const INITIAL_SETTINGS: UserSettings = {
  companyName: '未配置企业',
  userName: '管理员',
  userRole: '管理员',
  avatarUrl: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff'
};

const Dashboard: React.FC<DashboardProps> = ({ 
  onLogout, 
  companyId, 
  userRole, 
  inputs, 
  onUpdateInputs, 
  readOnly = false,
  permissions 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data State
  const [settings, setSettings] = useState<UserSettings>(INITIAL_SETTINGS);

  // Load company info for settings header
  useEffect(() => {
    if (companyId) {
      const enterprises = authService.getEnterprises();
      const currentEnt = enterprises.find(e => e.id === companyId);
      if (currentEnt) {
        setSettings((prev: UserSettings) => ({
          ...prev,
          companyName: currentEnt.companyName,
          userName: currentEnt.username
        }));
      }
    }
  }, [companyId]);

  // Wrapper for onUpdateInputs to handle function updates if necessary, though simpler to just pass direct updates
  const handleSetInputs = (newInputs: RawInput[] | ((prev: RawInput[]) => RawInput[])) => {
    if (typeof newInputs === 'function') {
      onUpdateInputs(newInputs(inputs));
    } else {
      onUpdateInputs(newInputs);
    }
  };

  // Computed State (Global)
  const calculatedData = useMemo(() => processTaxRecords(inputs), [inputs]);

  // If readOnly is passed, use it. Otherwise fallback to role check (for backward compat if needed, but props should rule)
  const isReadOnly = readOnly || userRole === 'super_admin';

  const allMenuItems = [
    { id: 'dashboard', label: '工作台', icon: LayoutDashboard },
    { id: 'calculation', label: '个税智算', icon: Calculator },
    { id: 'history', label: '历史记录', icon: History },
    { id: 'personnel', label: '人员管理', icon: Users },
    { id: 'reports', label: '申报报表', icon: FileText },
    { id: 'settings', label: '系统设置', icon: SettingsIcon },
  ];

  const menuItems = useMemo(() => {
    if (!permissions || permissions.length === 0) return allMenuItems;
    // Always show dashboard? Or is 'dashboard' a permission?
    // Usually 'dashboard' is basic access.
    // Let's assume 'dashboard' is always there.
    return allMenuItems.filter(item => 
      item.id === 'dashboard' || permissions.includes(item.id)
    );
  }, [permissions]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Worktable data={calculatedData} onNavigate={setActiveTab} />;
      case 'calculation':
        return <TaxTable inputs={inputs} setInputs={handleSetInputs} calculatedData={calculatedData} readOnly={isReadOnly} />;
      case 'history':
        return <HistoryRecords inputs={inputs} setInputs={handleSetInputs} calculatedData={calculatedData} readOnly={isReadOnly} />;
      case 'personnel':
        return <PersonnelManager data={calculatedData} />;
      case 'reports':
        return <Reports data={calculatedData} />;
      case 'settings':
        return <Settings settings={settings} onUpdate={setSettings} readOnly={isReadOnly} />;
      default:
        return <div>Not Found</div>;
    }
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
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
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
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-blue-500/30">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-blue-200 hover:text-white hover:bg-blue-500/50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            退出企业登录
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
              <img 
                className="h-8 w-8 rounded-full bg-slate-200 object-cover" 
                src={settings.avatarUrl}
                alt="User" 
              />
              <div className="hidden md:block text-sm">
                <p className="font-medium text-slate-700">{settings.userName}</p>
                <p className="text-slate-500 text-xs">{settings.companyName}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-8 bg-slate-100">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
