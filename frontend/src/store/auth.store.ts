// =========================================================
// Auth Store — Zustand
// Global auth state: current user, role, loading
// =========================================================

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: user !== null,
          isLoading: false,
        }),

      setLoading: (loading) => set({ isLoading: loading }),

      clearAuth: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }),
    }),
    {
      name: "campusx-auth",
      storage: createJSONStorage(() => sessionStorage),
      // Only persist the user object, not loading state
      partialize: (state) => ({ user: state.user }),
    }
  )
);

// Selector hooks for clean component usage
export const useCurrentUser = () => useAuthStore((s) => s.user);
export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
export const useIsAdmin = () =>
  useAuthStore((s) => s.user?.role === "ADMIN");
export const useIsVerified = () =>
  useAuthStore((s) => s.user?.verificationStatus === "verified");
