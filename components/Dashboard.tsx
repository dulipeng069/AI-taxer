
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { LayoutDashboard, Users, Calculator, FileText, Settings as SettingsIcon, LogOut, Menu, X, Bell, History, Loader2, RefreshCw, ShieldCheck } from 'lucide-react';
import TaxTable from './TaxTable';
import Worktable from './Worktable';
import PersonnelManager from './PersonnelManager';
import Reports from './Reports';
import Settings from './Settings';
import HistoryRecords from './HistoryRecords';
import { RawInput, UserSettings } from '../types';
import { processTaxRecords } from '../services/taxCalculator';
import { authService } from '../services/authService';
import { taxService } from '../services/taxService';
import { notificationService, Notification } from '../services/notificationService';

interface DashboardProps {
  onLogout: () => void;
  companyId?: string;
  companyName?: string;
  companyCode?: string;
  userName?: string;
  userRole?: string;
  readOnly?: boolean;
  permissions?: string[];
  validUntil?: string;
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
  companyName,
  companyCode,
  userName,
  userRole, 
  readOnly = false,
  permissions,
  validUntil
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data State
  const [inputs, setInputs] = useState<RawInput[]>([]);
  const [settings, setSettings] = useState<UserSettings>({
    ...INITIAL_SETTINGS,
    companyName: companyName || INITIAL_SETTINGS.companyName,
    companyCode: companyCode,
    userName: userName || INITIAL_SETTINGS.userName
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Notification State
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load company info for settings header
  useEffect(() => {
    if (companyName && userName) {
        setSettings((prev: UserSettings) => ({
            ...prev,
            companyName: companyName,
            companyCode: companyCode,
            userName: userName
        }));
    } else if (companyId) {
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
  }, [companyId, companyName, companyCode, userName]);

  // Fetch Data
  const fetchData = useCallback(async () => {
    if (!companyId) {
      console.log("fetchData skipped: No companyId");
      return;
    }
    
    setIsLoading(true);
    try {
      console.log(`Fetching records for companyId: ${companyId}`);
      const data = await taxService.getRecords(companyId);
      console.log(`Fetched ${data.length} records`);
      if (data.length > 0) {
        console.log("First record sample:", data[0]);
      }
      setInputs(data);
    } catch (error) {
      console.error("Failed to fetch records:", error);
      // Optionally show error toast
    } finally {
      setIsLoading(false);
    }
  }, [companyId]);

  const fetchNotifications = useCallback(async () => {
    if (!companyId) return;
    try {
        const data = await notificationService.getNotifications(companyId);
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.isRead).length);
    } catch (error) {
        console.error("Failed to fetch notifications:", error);
    }
  }, [companyId]);

  const handleReadNotification = async (notification: Notification) => {
    if (!notification.isRead) {
        await notificationService.markAsRead(notification.id);
        setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
    }
    // Here you could also open a modal to show the full content
  };

  // Debug: Monitor inputs changes
  useEffect(() => {
    console.log(`Dashboard: inputs state updated. Count: ${inputs.length}`);
  }, [inputs]);

  // Load data on mount or company change
  useEffect(() => {
    fetchData();
    fetchNotifications();
  }, [fetchData, fetchNotifications]);

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
    return allMenuItems.filter(item => 
      item.id === 'dashboard' || permissions.includes(item.id)
    );
  }, [permissions]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Worktable data={calculatedData} onNavigate={setActiveTab} />;
      case 'calculation':
        return (
          <TaxTable 
            inputs={inputs} 
            companyId={companyId}
            onDataChange={fetchData}
            calculatedData={calculatedData} 
            readOnly={isReadOnly} 
          />
        );
      case 'history':
        return (
          <HistoryRecords 
            inputs={inputs} 
            companyId={companyId}
            onDataChange={fetchData}
            calculatedData={calculatedData} 
            readOnly={isReadOnly} 
          />
        );
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
          
          <div className="flex-1 flex items-center gap-4">
            {activeTab === 'dashboard' ? (
              <div>
                <h1 className="text-lg font-bold text-slate-900">工作台</h1>
                <p className="text-xs text-slate-500 hidden sm:block">欢迎回来，已启用 2025 劳务报酬个税新规算法</p>
              </div>
            ) : (
              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  {menuItems.find(m => m.id === activeTab)?.label}
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">
                  {activeTab === 'calculation' && '数据批量导入与实时计算'}
                  {activeTab === 'history' && '查看及管理所有上传的计算批次'}
                  {activeTab === 'personnel' && '人员收入概览与档案查询'}
                  {activeTab === 'reports' && '按月度汇总个税申报数据'}
                  {activeTab === 'settings' && '配置企业基础信息与个人账号档案'}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            {validUntil && (
               <div className="hidden md:block text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                 有效期至: {new Date(validUntil).toLocaleDateString()}
               </div>
            )}
            <button 
              onClick={() => fetchData()} 
              className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
              title="刷新数据"
            >
              <RefreshCw size={20} />
            </button>
            <div className="relative">
                <button 
                    className="relative p-1 text-slate-400 hover:text-blue-600 transition-colors"
                    onClick={() => setShowNotifications(!showNotifications)}
                >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                    )}
                </button>
                {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 max-h-96 overflow-y-auto">
                        <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-gray-700">通知中心</h3>
                            <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-500">
                                <X size={16} />
                            </button>
                        </div>
                        {notifications.length === 0 ? (
                            <div className="px-4 py-6 text-center text-sm text-gray-500">暂无通知</div>
                        ) : (
                            notifications.map(notification => (
                                <div 
                                    key={notification.id} 
                                    className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer ${!notification.isRead ? 'bg-blue-50/30' : ''}`}
                                    onClick={() => handleReadNotification(notification)}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`text-xs px-1.5 py-0.5 rounded ${notification.type === 'ALERT' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {notification.type === 'ALERT' ? '警告' : '系统'}
                                        </span>
                                        <span className="text-xs text-gray-400">{new Date(notification.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-600'}`}>{notification.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notification.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
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
        <main className="flex-1 overflow-auto p-4 lg:p-8 bg-slate-100 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 z-50 flex items-center justify-center backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
                <p className="text-sm font-medium text-brand-700">数据加载中...</p>
              </div>
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
