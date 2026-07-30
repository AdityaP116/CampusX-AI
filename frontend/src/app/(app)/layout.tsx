import type { ReactNode } from "react";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import TopNav from "@/components/common/TopNav";
import MobileNav from "@/components/common/MobileNav";
import { AppLayoutWrapper } from "@/components/layout/AppLayoutWrapper";

// =========================================================
// App Layout — Protected shell for all authenticated pages
// Combines TopNav + SideNav (desktop) + MobileNav + content area
// =========================================================

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      {/* Top navigation bar */}
      <TopNav variant="app" />

      {/* Main content wrapper */}
      <AppLayoutWrapper>
        {children}
      </AppLayoutWrapper>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </ProtectedRoute>
  );
}
