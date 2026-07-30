// =========================================================
// Auth API Service
// All authentication-related API calls
// =========================================================

import apiClient from "./api.client";
import type { ApiSuccessResponse, User } from "@/types";

export interface RegisterPayload {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

export interface UpdateProfilePayload {
  displayName?: string;
  universityName?: string;
  universityEmail?: string;
}

const AuthApi = {
  /** Register or sync a Firebase user in our backend */
  register: (payload: RegisterPayload) =>
    apiClient.post<ApiSuccessResponse<User>>("/auth/register", payload),

  /** Get the current authenticated user's profile */
  getMe: () => apiClient.get<ApiSuccessResponse<User>>("/auth/me"),

  /** Update the current user's profile */
  updateProfile: (payload: UpdateProfilePayload) =>
    apiClient.patch<ApiSuccessResponse<User>>("/auth/me", payload),

  /** Upload student ID for verification */
  uploadStudentId: (formData: FormData) =>
    apiClient.post<ApiSuccessResponse<User>>("/auth/verify/student-id", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /** Verify student email (resend verification email) */
  sendVerificationEmail: () =>
    apiClient.post<ApiSuccessResponse<null>>("/auth/verify/email"),
};

export default AuthApi;
