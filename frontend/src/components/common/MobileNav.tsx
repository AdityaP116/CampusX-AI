"use client";

// =========================================================
// MobileNav — Bottom tab navigation for mobile
// Matches design/1/user_dashboard and marketplace_home mobile navbars
// =========================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Grid, Compass, Bookmark, MessageSquare, User } from "lucide-react";

const MOBILE_NAV_ITEMS = [
  {
    href: ROUTES.MARKETPLACE,
    label: "Market",
    Icon: Grid,
  },
  {
    href: ROUTES.CATEGORIES,
    label: "Explore",
    Icon: Compass,
  },
  {
    href: ROUTES.WISHLIST,
    label: "Saved",
    Icon: Bookmark,
  },
  {
    href: ROUTES.CHAT,
    label: "Inbox",
    Icon: MessageSquare,
  },
  {
    href: ROUTES.PROFILE,
    label: "Profile",
    Icon: User,
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
            className={`flex flex-col items-center gap-1 min-w-[48px] px-2 transition-colors ${
              active
                ? "text-primary"
                : "text-on-surface-variant"
            }`}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
          >
            <item.Icon
              className="w-6 h-6"
              aria-hidden="true"
            />
            <span className="text-[11px] font-bold uppercase tracking-wide">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
