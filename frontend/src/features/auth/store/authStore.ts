"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "firebase/auth"

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

interface AuthState {
  user: AuthUser | null
  loading: boolean
  setUser: (user: User | AuthUser | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      setUser: (user) => {
        if (!user) {
          set({ user: null })
          return
        }
        set({
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
        })
      },
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "campusx-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
)
