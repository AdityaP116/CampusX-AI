// =========================================================
// Admin API Service
// Role-protected — only accessible with ADMIN role
// =========================================================

import apiClient from "./api.client";
import type {
  ApiSuccessResponse,
  AdminStats,
  User,
  Product,
  PaginatedResponse,
} from "@/types";

const AdminApi = {
  /** Dashboard stats */
  getStats: () =>
    apiClient.get<ApiSuccessResponse<AdminStats>>("/admin/stats"),

  /** Get all users (paginated) */
  getUsers: (page = 1, limit = 20) =>
    apiClient.get<ApiSuccessResponse<PaginatedResponse<User>>>("/admin/users", {
      params: { page, limit },
    }),

  /** Verify a user (approve ID) */
  verifyUser: (userId: string) =>
    apiClient.patch<ApiSuccessResponse<User>>(`/admin/users/${userId}/verify`),

  /** Reject a user's verification */
  rejectUser: (userId: string, reason: string) =>
    apiClient.patch<ApiSuccessResponse<User>>(
      `/admin/users/${userId}/reject`,
      { reason }
    ),

  /** Get all listings (paginated) */
  getListings: (page = 1, limit = 20) =>
    apiClient.get<ApiSuccessResponse<PaginatedResponse<Product>>>(
      "/admin/listings",
      { params: { page, limit } }
    ),

  /** Remove a listing */
  removeListing: (productId: string, reason: string) =>
    apiClient.delete<ApiSuccessResponse<null>>(`/admin/listings/${productId}`, {
      data: { reason },
    }),

  /** Get reported items */
  getReports: () =>
    apiClient.get<ApiSuccessResponse<unknown[]>>("/admin/reports"),

  /** Resolve a report */
  resolveReport: (reportId: string, action: "dismiss" | "remove") =>
    apiClient.patch<ApiSuccessResponse<null>>(`/admin/reports/${reportId}`, {
      action,
    }),
};

export default AdminApi;
