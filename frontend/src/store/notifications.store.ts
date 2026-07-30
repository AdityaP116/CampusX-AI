import { create } from "zustand";

export type NotificationType = "offer" | "price_drop" | "verification" | "message" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  actionRequired?: boolean;
  avatarUrl?: string;
  icon?: string;
  iconBgClass?: string;
  iconColorClass?: string;
}

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notif: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  setNotifications: (notifs: Notification[]) => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  unreadCount: 0,
  
  addNotification: (notif) => set((state) => {
    const newNotifs = [notif, ...state.notifications];
    return {
      notifications: newNotifs,
      unreadCount: newNotifs.filter(n => n.unread).length
    };
  }),
  
  markAsRead: (id) => set((state) => {
    const newNotifs = state.notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    );
    return {
      notifications: newNotifs,
      unreadCount: newNotifs.filter(n => n.unread).length
    };
  }),
  
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, unread: false })),
    unreadCount: 0
  })),
  
  setNotifications: (notifs) => set({
    notifications: notifs,
    unreadCount: notifs.filter(n => n.unread).length
  })
}));
