let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export interface Notification {
  id: string;
  userId?: string | null;
  type: string;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export const notificationService = {
  getNotifications: async (userId: string): Promise<Notification[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const result = await response.json() as { data: Notification[] };
      return result.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  },

  sendNotification: async (title: string, content: string, type: string = 'SYSTEM', targetUserId?: string): Promise<Notification | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, type, targetUserId })
      });
      if (!response.ok) throw new Error('Failed to send notification');
      const result = await response.json() as { data: Notification };
      return result.data;
    } catch (error) {
      console.error('Error sending notification:', error);
      return null;
    }
  },

  markAsRead: async (id: string): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
        method: 'PUT'
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }
};
