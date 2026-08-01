"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  BarChart3,
  UserCheck,
  AlertTriangle,
  Package,
  Grid,
  History,
  Settings,
  Megaphone,
  HelpCircle,
  LogOut,
} from "lucide-react";

const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", Icon: BarChart3 },
  { href: "/admin/verification", label: "Verification", Icon: UserCheck },
  { href: "/admin/reports", label: "Reports", Icon: AlertTriangle },
  { href: "/admin/listings", label: "Listings", Icon: Package },
  { href: "/admin/categories", label: "Categories", Icon: Grid },
  { href: "/admin/activity-log", label: "Activity Log", Icon: History },
  { href: "/admin/settings", label: "Settings", Icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col w-[240px] z-40 bg-[#eff4ff] dark:bg-on-secondary-fixed-variant border-r border-outline-variant dark:border-outline">
      <div className="p-6 flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="CampusX Logo"
          width={40}
          height={40}
          className="w-10 h-10 object-contain rounded-full bg-white shadow-sm p-0.5"
        />
        <div>
          <h1 className="font-bold text-[18px] leading-7 tracking-tight text-on-surface">CampusX Admin</h1>
          <p className="text-[13px] leading-[18px] text-[#565e74]">System Oversight</p>
        </div>
      </div>
      
      <nav className="flex-1 mt-4 overflow-y-auto">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 px-4 py-3 cursor-pointer font-semibold text-small leading-5 transition-all ${
                isActive
                  ? "text-[#3525cd] bg-[#d3e4fe] border-l-4 border-[#3525cd]"
                  : "text-[#464555] hover:bg-[#e5eeff] border-l-4 border-transparent"
              }`}
            >
              <item.Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto p-4 border-t border-outline-variant">
        <button className="w-full mb-4 bg-[#3525cd] text-white font-semibold text-small py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:opacity-80 transition-opacity">
          <Megaphone className="w-5 h-5 shrink-0" aria-hidden="true" />
          New Broadcast
        </button>
        <div className="space-y-1">
          <Link href="#support" className="flex items-center gap-3 px-4 py-2 text-[#464555] hover:bg-[#e5eeff] rounded-lg transition-all text-sm font-medium">
            <HelpCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            Support
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-all text-sm font-medium">
            <LogOut className="w-5 h-5 shrink-0" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
