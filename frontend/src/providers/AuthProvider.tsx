"use client";

// =========================================================
// Auth Provider
// Listens to Firebase auth state and syncs with Zustand
// =========================================================

import { useEffect, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase.config";
import { useAuthStore } from "@/store/auth.store";
import AuthApi from "@/services/auth.api";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading, clearAuth } = useAuthStore();

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch the full user profile from our backend
          const response = await AuthApi.getMe();
          if (response.data.success) {
            setUser(response.data.data);
          }
        } catch {
          // Backend unreachable or user not registered yet
          // Still mark as loaded so the app doesn't hang
          setLoading(false);
        }
      } else {
        // User signed out
        clearAuth();
      }
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, [setUser, setLoading, clearAuth]);

  return <>{children}</>;
}
