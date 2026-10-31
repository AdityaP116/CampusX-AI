"use client"

import React, { createContext, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAuthStore } from "@/features/auth/store/authStore"

const AuthContext = createContext<null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      const isSecure = typeof window !== "undefined" && window.location.protocol === "https:"
      const secureFlag = isSecure ? "; Secure" : ""

      if (user) {
        try {
          const token = await user.getIdToken()
          const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://campusx-api-zuks.onrender.com/api/v1"
          const res = await fetch(`${BACKEND_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })

          if (res.ok) {
            document.cookie = `campusx-authed=1; path=/; max-age=2592000; SameSite=Lax${secureFlag}`
          } else if (res.status === 401 || res.status === 404) {
            // User explicitly unauthorized or not found in database
            document.cookie = `campusx-authed=; path=/; max-age=0; SameSite=Lax${secureFlag}`
          }
          // Note: If server responded with 500 or timeout during cold-start, we preserve session
        } catch {
          // Network error or backend cold start: retain existing auth state
        }
      } else {
        document.cookie = `campusx-authed=; path=/; max-age=0; SameSite=Lax${secureFlag}`
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [setUser, setLoading])

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>
}
