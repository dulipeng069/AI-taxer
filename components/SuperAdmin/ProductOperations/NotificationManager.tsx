import React, { useState, useEffect } from 'react';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';
import { notificationService } from '../../../services/notificationService';
import { userService, User } from '../../../services/userService';

const NotificationManager: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('SYSTEM');
  const [targetUserId, setTargetUserId] = useState<string>(''); // Empty string means Global
  const [users, setUsers] = useState<User[]>([]);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data.filter(u => u.role !== 'SUPER_ADMIN')); // Only send to enterprise admins
    } catch (error) {
      console.error('Failed to load users', error);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setSending(true);
    setMessage(null);

    try {
      await notificationService.sendNotification(
        title,
        content,
        type,
        targetUserId || undefined // Pass undefined if empty string to trigger global
      );
      setMessage({ text: '通知发送成功', type: 'success' });
      setTitle('');
      setContent('');
      // Optional: Reset target
    } catch (error) {
      setMessage({ text: '发送失败，请重试', type: 'error' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">发送消息通知</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSend} className="space-y-6">
          {/* Target Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              发送对象
            </label>
            <select
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="">所有企业 (全局广播)</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.companyName} ({user.username})
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-500">
              {targetUserId ? '仅发送给选定的企业' : '发送给系统中的所有企业用户'}
            </p>
          </div>

          {/* Notification Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              通知类型
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="SYSTEM"
                  checked={type === 'SYSTEM'}
                  onChange={(e) => setType(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">系统消息</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="ALERT"
                  checked={type === 'ALERT'}
                  onChange={(e) => setType(e.target.value)}
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-slate-700">重要警告</span>
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入通知标题"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              内容
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入通知详情..."
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              required
            />
          </div>

          {/* Status Message */}
          {message && (
            <div className={`p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span className="text-sm font-medium">{message.text}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={sending}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all
                ${sending 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95'
                }
              `}
            >
              <Send size={18} />
              {sending ? '发送中...' : '立即发送'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationManager;
