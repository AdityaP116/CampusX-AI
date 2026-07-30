import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

// Note: Admin routes should have a specific theme wrapper if the colors differ significantly,
// but for now we'll use the global theme and rely on the structural layout.

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#f8f9ff] min-h-screen font-sans text-on-surface">
      <AdminSidebar />
      <div className="ml-0 md:ml-[240px] flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1 p-container-margin md:p-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
