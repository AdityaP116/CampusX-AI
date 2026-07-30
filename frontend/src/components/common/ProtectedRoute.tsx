"use client";

// =========================================================
// ProtectedRoute — HOC / wrapper for authenticated routes
// Redirects unauthenticated users to /login
// Shows loading state while auth resolves
// =========================================================

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, useIsAdmin } from "@/store/auth.store";
import { ROUTES } from "@/constants/routes";

interface ProtectedRouteProps {
  children: ReactNode;
  /** If true, also require ADMIN role (admin panel routes) */
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuthStore();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    if (isLoading) return; // Wait for auth to resolve

    if (!isAuthenticated) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (requireAdmin && !isAdmin) {
      router.replace(ROUTES.DASHBOARD); // Non-admins redirected to dashboard
      return;
    }
  }, [isLoading, isAuthenticated, isAdmin, requireAdmin, router]);

  // Loading state — full screen spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary-container border-t-primary animate-spin" />
          <p className="text-small text-on-surface-variant">
            Loading CampusX...
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated — render nothing (redirect in progress)
  if (!isAuthenticated) return null;
  if (requireAdmin && !isAdmin) return null;

  return <>{children}</>;
}
