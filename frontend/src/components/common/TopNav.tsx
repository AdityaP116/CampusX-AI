"use client";

// =========================================================
// TopNav — Shared navigation component
// Used across public pages and authenticated app pages
// Glassmorphic sticky header matching the Stitch design
// =========================================================

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase.config";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser, useIsAuthenticated } from "@/store/auth.store";
import { useAuthStore } from "@/store/auth.store";
import { useToast } from "@/store/ui.store";
import { getInitials } from "@/utils";

interface TopNavProps {
  /** "public" = landing/marketing nav; "app" = logged-in dashboard nav */
  variant?: "public" | "app";
}

const PUBLIC_NAV_LINKS = [
  { href: ROUTES.MARKETPLACE, label: "Marketplace" },
  { href: "#rentals", label: "Rentals" },
  { href: "#exchanges", label: "Exchanges" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.FEATURES, label: "Features" },
  { href: ROUTES.PRICING, label: "Pricing" },
];

const APP_NAV_LINKS = [
  { href: ROUTES.MARKETPLACE, label: "Marketplace" },
  { href: `${ROUTES.MARKETPLACE}?type=RENT`, label: "Rentals" },
  { href: `${ROUTES.MARKETPLACE}?type=EXCHANGE`, label: "Exchanges" },
];

export default function TopNav({ variant = "public" }: TopNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const toast = useToast();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = variant === "app" ? APP_NAV_LINKS : PUBLIC_NAV_LINKS;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      clearAuth();
      router.push(ROUTES.HOME);
      toast.success("Signed out", "See you next time!");
    } catch {
      toast.error("Sign out failed", "Please try again.");
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-nav border-b border-outline-variant/30 shadow-sm">
      <div className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-16">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          <Link
            href={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.HOME}
            className="font-bold text-title text-primary tracking-tight"
            aria-label="CampusX home"
          >
            CampusX
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex gap-6" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors duration-200 text-body ${
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary pb-1"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated && currentUser ? (
            <>
              {/* Search (app only, desktop) */}
              {variant === "app" && (
                <div className="relative hidden lg:block">
                  <span
                    className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-title"
                    aria-hidden="true"
                  >
                    search
                  </span>
                  <input
                    className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 text-small transition-all"
                    placeholder="Search campus..."
                    type="search"
                    aria-label="Search listings"
                  />
                </div>
              )}

              {/* Notifications */}
              <Link
                href={ROUTES.NOTIFICATIONS}
                className="p-2 text-on-surface-variant hover:bg-surface-variant/50 rounded-full transition-colors relative"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  notifications
                </span>
              </Link>

              {/* Chat */}
              <Link
                href={ROUTES.CHAT}
                className="p-2 text-on-surface-variant hover:bg-surface-variant/50 rounded-full transition-colors"
                aria-label="Messages"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  chat_bubble
                </span>
              </Link>

              <div className="h-8 w-px bg-outline-variant/30 mx-2" />

              {/* Post Listing CTA */}
              <Link
                href={ROUTES.SELL}
                className="bg-primary-container text-on-primary-container px-5 py-2 rounded-full font-semibold text-small hover:opacity-90 active:scale-95 transition-all"
              >
                Post Listing
              </Link>

              {/* Avatar + Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen((o) => !o)}
                  className="w-10 h-10 rounded-full border-2 border-primary-fixed-dim p-0.5 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-label="Profile menu"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="menu"
                >
                  {currentUser.photoURL ? (
                    <Image
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-small">
                      {getInitials(currentUser.displayName)}
                    </div>
                  )}
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-56 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[var(--shadow-floating)] overflow-hidden z-50"
                      role="menu"
                    >
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-outline-variant/20">
                        <p className="text-small font-semibold text-on-surface truncate">
                          {currentUser.displayName}
                        </p>
                        <p className="text-caption text-on-surface-variant truncate">
                          {currentUser.email}
                        </p>
                      </div>
                      {/* Links */}
                      {[
                        { href: ROUTES.DASHBOARD, label: "Dashboard", icon: "grid_view" },
                        { href: ROUTES.PROFILE, label: "My Profile", icon: "person" },
                        { href: ROUTES.WISHLIST, label: "Wishlist", icon: "favorite" },
                        { href: ROUTES.SETTINGS, label: "Settings", icon: "settings" },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-small text-on-surface hover:bg-surface-container-low transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] text-on-surface-variant" aria-hidden="true">
                            {item.icon}
                          </span>
                          {item.label}
                        </Link>
                      ))}
                      {/* Sign out */}
                      <div className="border-t border-outline-variant/20 mt-1">
                        <button
                          onClick={handleSignOut}
                          role="menuitem"
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-small text-error hover:bg-error-container transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                            logout
                          </span>
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              {/* Notifications icon (public, desktop) */}
              <button
                className="hidden md:flex items-center gap-2 px-4 py-2 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl transition-all"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  notifications
                </span>
              </button>

              {/* Login CTA */}
              <Link
                href={ROUTES.LOGIN}
                className="bg-primary text-on-primary px-6 py-2 rounded-xl font-semibold shadow-[var(--shadow-primary)] hover:scale-[1.02] active:scale-95 transition-all"
              >
                Login
              </Link>
            </>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-outline-variant/20 bg-surface/95 backdrop-blur-xl overflow-hidden"
            aria-label="Mobile navigation"
          >
            <div className="px-gutter py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-body text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="pt-2 border-t border-outline-variant/20">
                  <Link
                    href={ROUTES.LOGIN}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center bg-primary text-on-primary px-6 py-3 rounded-xl font-semibold mt-2"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
