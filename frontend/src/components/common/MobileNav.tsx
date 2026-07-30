"use client";

// =========================================================
// MobileNav — Bottom tab navigation for mobile
// Matches design/1/user_dashboard and marketplace_home mobile navbars
// =========================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const MOBILE_NAV_ITEMS = [
  {
    href: ROUTES.MARKETPLACE,
    label: "Market",
    icon: "grid_view",
    activeIcon: "grid_view",
  },
  {
    href: ROUTES.CATEGORIES,
    label: "Explore",
    icon: "explore",
    activeIcon: "explore",
  },
  {
    href: ROUTES.WISHLIST,
    label: "Saved",
    icon: "favorite",
    activeIcon: "favorite",
  },
  {
    href: ROUTES.CHAT,
    label: "Inbox",
    icon: "chat_bubble",
    activeIcon: "chat_bubble",
  },
  {
    href: ROUTES.PROFILE,
    label: "Profile",
    icon: "person",
    activeIcon: "person",
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === ROUTES.MARKETPLACE) return pathname.startsWith("/marketplace");
    if (href === ROUTES.CATEGORIES) return pathname.startsWith("/categories");
    if (href === ROUTES.WISHLIST) return pathname.startsWith("/wishlist");
    if (href === ROUTES.CHAT) return pathname.startsWith("/chat");
    if (href === ROUTES.PROFILE) return pathname.startsWith("/profile");
    return false;
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant/30 flex justify-around items-center py-3 z-50 safe-area-bottom"
      aria-label="Mobile navigation"
    >
      {MOBILE_NAV_ITEMS.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              active
                ? "text-primary"
                : "text-on-surface-variant"
            }`}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
          >
            <span
              className="material-symbols-outlined text-h3"
              style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
              aria-hidden="true"
            >
              {active ? item.activeIcon : item.icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wide">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
