
import React from 'react';
import { UserSettings } from '../types';
import { Building2, User, Save, Camera } from 'lucide-react';

interface SettingsProps {
  settings: UserSettings;
  onUpdate: (s: UserSettings) => void;
  readOnly?: boolean;
}

const Settings: React.FC<SettingsProps> = ({ settings, onUpdate, readOnly }) => {
  const handleChange = (key: keyof UserSettings, value: string) => {
    if (readOnly) return;
    onUpdate({ ...settings, [key]: value });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">系统设置</h2>
        <p className="text-gray-500 text-sm mt-1">配置企业基础信息与个人账号档案</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
         
         <div className="flex flex-col md:flex-row gap-10">
            {/* Left: Avatar Column */}
            <div className="flex-shrink-0 flex flex-col items-center pt-2">
                <div 
                  className={`relative group ${readOnly ? '' : 'cursor-pointer'} w-32 h-32`}
                  onClick={() => {
                     if (readOnly) return;
                     const url = prompt("请输入头像URL地址", settings.avatarUrl);
                     if(url) handleChange('avatarUrl', url);
                  }}
                >
                    <img 
                      src={settings.avatarUrl} 
                      alt="avatar" 
                      className="w-full h-full rounded-full bg-gray-100 object-cover border-4 border-white shadow-md group-hover:opacity-90 transition-opacity" 
                    />
                    {!readOnly && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Camera size={24} className="text-white mb-1" />
                          <span className="text-white text-xs font-bold">更换头像</span>
                      </div>
                    )}
                </div>
                <div className="mt-4 text-center">
                   <p className="text-sm text-gray-500 font-medium">当前账号</p>
                   <p className="text-lg font-bold text-gray-900">{settings.userName}</p>
                </div>
            </div>

            {/* Right: Form Fields */}
            <div className="flex-1 space-y-8">
                <div className="grid grid-cols-1 gap-6">
                    {/* Company Name */}
                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <Building2 size={18} className="text-brand-600" /> 企业名称
                        </label>
                        <input 
                            type="text" 
                            disabled={readOnly}
                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-gray-400 ${readOnly ? 'bg-gray-50 text-gray-500' : ''}`}
                            value={settings.companyName}
                            onChange={e => handleChange('companyName', e.target.value)}
                            placeholder="输入企业全称，如：北京星河文化传媒有限公司"
                        />
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                           <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                           该名称将显示在系统顶栏及导出报表的表头中
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Display Name */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                <User size={18} className="text-brand-600" /> 显示名称
                            </label>
                            <input 
                                type="text" 
                                disabled={readOnly}
                                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all ${readOnly ? 'bg-gray-50 text-gray-500' : ''}`}
                                value={settings.userName}
                                onChange={e => handleChange('userName', e.target.value)}
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">角色 / 职位</label>
                            <input 
                                type="text" 
                                disabled={readOnly}
                                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all ${readOnly ? 'bg-gray-50 text-gray-500' : ''}`}
                                value={settings.userRole}
                                onChange={e => handleChange('userRole', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
         </div>

         {/* Footer Actions */}
         {!readOnly && (
           <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
              <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-brand-100 hover:shadow-xl hover:shadow-brand-200 transition-all transform hover:-translate-y-0.5">
                  <Save size={18} /> 保存配置
              </button>
           </div>
         )}

      </div>
    </div>
  );
};

export default Settings;
