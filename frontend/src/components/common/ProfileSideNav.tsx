"use client";

// =========================================================
// ProfileSideNav — Desktop left sidebar for account pages
// Matches design/1/notifications_center sidebar
// =========================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/store/auth.store";

const PROFILE_NAV_ITEMS = [
  { href: ROUTES.CHAT, label: "Inbox", icon: "inbox" },
  { href: "/offers", label: "Offers", icon: "local_offer" },
  { href: ROUTES.WISHLIST, label: "Saved", icon: "bookmark" },
  { href: "/listings", label: "Listings", icon: "sell" },
  { href: ROUTES.SETTINGS, label: "Settings", icon: "settings" },
];

export default function ProfileSideNav() {
  const pathname = usePathname();
  const currentUser = useCurrentUser();

  return (
    <aside className="hidden lg:flex flex-col w-64 sticky top-16 h-[calc(100vh-64px)] bg-surface-container-low border-r border-outline-variant/20 p-md gap-sm shrink-0">
      {/* Profile Header (horizontal layout as in notifications_center) */}
      <div className="flex items-center gap-md p-sm mb-md">
        <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shrink-0 overflow-hidden">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3-d-IscdQb82DmEufiB__o6PC9te02hpf8g5X3D68bJUWtZQcRTxVJLA5LNwNghTipTnpx6OLC1o0YhMFMwHh-SxFdrML1S9w2B-8Gf28bLlapz-6Mb1YDEaJaPKMJ313c72-qySbR0TL6HNu8RVutNqI-glH8s_iHBht4waRXhezNegY7bfjqmsERsZrlJCQllqO1OeheOg806OQ_krsVzQkmOyaBhY9udvJcAfyX-Bj6i8pzmb9dzm0gNezytt0Wdu1pq44U1zi" 
            alt="Profile"
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-small text-on-surface truncate">
            {currentUser?.displayName || "Alex Rivers"}
          </h3>
          <p className="font-medium text-caption text-on-surface-variant truncate">
            Verified Student
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-xs flex-grow" aria-label="Profile navigation">
        {PROFILE_NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href) && item.href !== "/";
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-md px-md py-sm rounded-xl transition-all duration-200 hover:translate-x-1 ${
                isActive
                  ? "bg-secondary-fixed text-on-secondary-fixed-variant font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="profile-sidebar-active"
                  className="absolute inset-0 bg-secondary-fixed rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className="material-symbols-outlined"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span className="font-medium text-small">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-md border-t border-outline-variant/30">
        <Link
          href="#help"
          className="flex items-center gap-md text-on-surface-variant hover:bg-surface-container-high rounded-xl px-md py-sm transition-colors"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            help
          </span>
          <span className="font-medium text-small">Support</span>
        </Link>
      </div>
    </aside>
  );
}
