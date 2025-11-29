import { EnterpriseAccount, UserSession, RawInput } from '../types';

const STORAGE_KEYS = {
  ENTERPRISES: 'taxmaster_enterprises',
  INPUTS: 'taxmaster_inputs',
  CURRENT_USER: 'taxmaster_current_user'
};

// Initial Mock Data
const INITIAL_ENTERPRISES: EnterpriseAccount[] = [
  {
    id: 'ent_001',
    companyName: '北京星河文化传媒有限公司',
    username: 'admin_xinghe',
    password: 'password123',
    status: 'active',
    createdAt: Date.now(),
    permissions: ['calculation', 'reports', 'history', 'personnel', 'settings']
  }
];

// Super Admin Credentials (hardcoded for now)
const SUPER_ADMIN = {
  username: 'dulipeng',
  password: 'dlp389757'
};

let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Safety override: Ensure we never connect to Cloudflare from the deployed instance
// unless explicitly intended. This prevents data leakage between environments.
if (API_BASE_URL.includes('workers.dev') || API_BASE_URL.includes('ai-taxer.com')) {
  console.warn('Build configuration error: Cloudflare URL detected. Forcing local API usage.');
  API_BASE_URL = '';
}

export const authService = {
  // Login Logic
  login: async (username: string, password: string): Promise<UserSession | null> => {
    // 1. Check Super Admin (Keep hardcoded for now)
    if (username === SUPER_ADMIN.username && password === SUPER_ADMIN.password) {
      const session: UserSession = {
        userId: 'super_admin',
        username: 'Super Admin',
        role: 'super_admin'
      };
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
      return session;
    }

    // 2. Call API for Enterprise Accounts
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        if (response.status === 401) {
            return null;
        }
        throw new Error('Login failed');
      }

      const data = await response.json() as { status?: string, data?: any };
      
      if (data.status === 'ok' && data.data) {
          const user = data.data;
          const session: UserSession = {
            userId: user.id,
            username: user.username,
            role: user.role === 'ENTERPRISE_ADMIN' ? 'enterprise_admin' : 'super_admin', // Map role
            companyId: user.id, // Using user ID as company ID for now since one user per company
            companyName: user.companyName
          };
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
          return session;
      }
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }

    return null;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser: (): UserSession | null => {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return stored ? JSON.parse(stored) : null;
  },

  changePassword: async (passwordData: { username: string, oldPassword: string, newPassword: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(passwordData)
    });

    if (!response.ok) {
      const data = await response.json() as { error?: string };
      throw new Error(data.error || 'Failed to change password');
    }
    
    return await response.json();
  },

  // Enterprise Management (Super Admin)
  getEnterprises: (): EnterpriseAccount[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.ENTERPRISES);
    if (!stored) {
      // Initialize with default if empty
      localStorage.setItem(STORAGE_KEYS.ENTERPRISES, JSON.stringify(INITIAL_ENTERPRISES));
      return INITIAL_ENTERPRISES;
    }
    return JSON.parse(stored);
  },

  saveEnterprise: (ent: EnterpriseAccount) => {
    const list = authService.getEnterprises();
    const index = list.findIndex(e => e.id === ent.id);
    if (index >= 0) {
      list[index] = ent;
    } else {
      list.push(ent);
    }
    localStorage.setItem(STORAGE_KEYS.ENTERPRISES, JSON.stringify(list));
  },

  deleteEnterprise: (id: string) => {
    const list = authService.getEnterprises().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.ENTERPRISES, JSON.stringify(list));
  },

  // Data Access
  getAllInputs: (): RawInput[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.INPUTS);
    return stored ? JSON.parse(stored) : [];
  },

  saveAllInputs: (inputs: RawInput[]) => {
    localStorage.setItem(STORAGE_KEYS.INPUTS, JSON.stringify(inputs));
  },
  
  // Get inputs for a specific company
  getCompanyInputs: (companyId: string): RawInput[] => {
    const all = authService.getAllInputs();
    return all.filter(i => i.companyId === companyId);
  },

  // Save inputs for a specific company (merges with others)
  saveCompanyInputs: (companyId: string, inputs: RawInput[]) => {
    const all = authService.getAllInputs();
    const others = all.filter(i => i.companyId !== companyId);
    // Ensure new inputs have the correct companyId
    const companyInputs = inputs.map(i => ({ ...i, companyId }));
    localStorage.setItem(STORAGE_KEYS.INPUTS, JSON.stringify([...others, ...companyInputs]));
  }
};
