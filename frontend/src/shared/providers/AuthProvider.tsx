"use client"

import React, { createContext, useContext, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAuthStore } from "@/features/auth/store/authStore"

const AuthContext = createContext<null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
      if (user) {
        try {
          const token = await user.getIdToken()
          const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1"
          const res = await fetch(`${BACKEND_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (res.ok) {
            document.cookie = "campusx-authed=1; path=/; max-age=2592000; SameSite=Lax"
          } else {
            // User not registered in backend yet
            document.cookie = "campusx-authed=; path=/; max-age=0; SameSite=Lax"
          }
        } catch (error) {
          document.cookie = "campusx-authed=; path=/; max-age=0; SameSite=Lax"
        }
      } else {
        document.cookie = "campusx-authed=; path=/; max-age=0; SameSite=Lax"
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [setUser, setLoading])

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>
}
