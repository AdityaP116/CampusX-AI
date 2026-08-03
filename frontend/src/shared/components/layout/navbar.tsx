"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import { useAuthStore } from "@/features/auth/store/authStore"
import { logout } from "@/features/auth/services/authService"
import { Plus, MessageSquare, User, LogOut } from "lucide-react"

export function Navbar() {
  const router = useRouter()
  const { user, loading } = useAuthStore()
  const [menuOpen, setMenuOpen] = React.useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-[12px] border-b border-outline-variant/30">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between max-w-[1280px]">
        {/* Logo + Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
            <img src="/logo.png" alt="CampusX Logo" className="h-12 w-12 rounded-full object-cover shadow-sm" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/marketplace"
              className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
            >
              Marketplace
            </Link>
            {user && (
              <Link
                href="/messages"
                className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
              >
                Messages
              </Link>
            )}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-8 w-24 rounded-md bg-surface-container animate-pulse" />
          ) : user ? (
            <>
              <Link href="/create">
                <Button variant="primary" size="sm" className="hidden sm:inline-flex gap-1.5">
                  <Plus className="h-4 w-4" />
                  Post Item
                </Button>
              </Link>
              <Link href="/messages">
                <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant hover:text-primary">
                  <MessageSquare className="h-5 w-5" />
                </button>
              </Link>
              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-surface-container-low transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {user.displayName?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U"}
                  </div>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border border-outline-variant/20 py-1 z-50">
                    <div className="px-3 py-2 border-b border-outline-variant/20">
                      <p className="text-sm font-medium text-on-surface truncate">{user.displayName ?? "Student"}</p>
                      <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <User className="h-4 w-4" />
                      My Profile
                    </Link>
                    <button
                      onClick={() => { setMenuOpen(false); handleLogout() }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Log in</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
