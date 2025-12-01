let API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// If not explicitly set, default to empty string (relative path) for production
// This fixes the issue where it defaults to localhost:8789 when VITE_API_BASE_URL is empty
if (!API_BASE_URL) {
  API_BASE_URL = '';
}

// Safety override: Ensure we never connect to Cloudflare from the deployed instance
if (API_BASE_URL.includes('workers.dev') || API_BASE_URL.includes('ai-taxer.com')) {
  API_BASE_URL = '';
}

export interface User {
  id: string;
  username: string;
  role: 'SUPER_ADMIN' | 'ENTERPRISE_ADMIN';
  companyName?: string;
  companyCode?: string;
  status: string;
  createdAt: string;
  phone?: string;
  realName?: string;
  subscription?: string;
  validUntil?: string;
}

export const userService = {
  // Submit Application (Public)
  submitApplication: async (data: { companyName: string; realName: string; phone: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json() as { error?: string };
        throw new Error(error.error || 'Failed to submit application');
      }
      return await response.json();
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },

  // Get all users (Super Admin)
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json() as { data: User[] };
      return data.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Create user (Super Admin)
  createUser: async (userData: { username: string; password: string; role: string; companyName?: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const error = await response.json() as { error?: string };
        throw new Error(error.error || 'Failed to create user');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update user (Super Admin)
  updateUser: async (id: string, userData: { companyName?: string; status?: string; subscription?: string; validUntil?: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const error = await response.json() as { error?: string };
        throw new Error(error.error || 'Failed to update user');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Reset Password (Super Admin)
  resetPassword: async (id: string, newPassword: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      if (!response.ok) {
        const error = await response.json() as { error?: string };
        throw new Error(error.error || 'Failed to reset password');
      }
      return await response.json();
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },

  // Delete User (Super Admin)
  deleteUser: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const error = await response.json() as { error?: string };
        throw new Error(error.error || 'Failed to delete user');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};
