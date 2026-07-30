// =========================================================
// Notifications API Service
// =========================================================

import apiClient from "./api.client";
import type { ApiSuccessResponse, Notification } from "@/types";

const NotificationsApi = {
  /** Get all notifications for current user */
  getNotifications: () =>
    apiClient.get<ApiSuccessResponse<Notification[]>>("/notifications"),

  /** Get unread notification count */
  getUnreadCount: () =>
    apiClient.get<ApiSuccessResponse<{ count: number }>>("/notifications/unread-count"),

  /** Mark a notification as read */
  markAsRead: (notificationId: string) =>
    apiClient.patch<ApiSuccessResponse<null>>(
      `/notifications/${notificationId}/read`
    ),

  /** Mark all notifications as read */
  markAllAsRead: () =>
    apiClient.patch<ApiSuccessResponse<null>>("/notifications/read-all"),

  /** Delete a notification */
  deleteNotification: (notificationId: string) =>
    apiClient.delete<ApiSuccessResponse<null>>(
      `/notifications/${notificationId}`
    ),
};

export default NotificationsApi;
