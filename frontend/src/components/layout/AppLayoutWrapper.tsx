"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import SideNav from "@/components/common/SideNav";
import ProfileSideNav from "@/components/common/ProfileSideNav";
import { ROUTES } from "@/constants/routes";

export function AppLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isChat = pathname.startsWith("/chat");

  if (isChat) {
    return (
      <div className="flex pt-16 h-screen overflow-hidden">
        {/* We don't render SideNav in chat; chat has its own sidebar layout */}
        <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
          {children}
        </main>
      </div>
    );
  }

  const isProfileRoute = pathname.startsWith("/notifications") || pathname.startsWith(ROUTES.SETTINGS) || pathname.startsWith("/offers") || pathname.startsWith("/listings");
  const hideSidebar = pathname.startsWith("/profile");

  return (
    <div className="flex max-w-container-max mx-auto pt-16 min-h-screen">
      {!hideSidebar && (isProfileRoute ? <ProfileSideNav /> : <SideNav />)}
      <main className="flex-1 min-w-0 px-gutter py-xl pb-20 md:pb-xl">
        {children}
      </main>
    </div>
  );
}
