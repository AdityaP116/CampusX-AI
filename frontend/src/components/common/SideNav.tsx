"use client";

// =========================================================
// SideNav — Desktop left sidebar
// Pixel-perfect match of design/1/user_dashboard + marketplace_home sidebars
// =========================================================

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/store/auth.store";

const NAV_ITEMS = [
  { href: ROUTES.DASHBOARD, label: "Dashboard", icon: "grid_view" },
  { href: ROUTES.MARKETPLACE, label: "All Products", icon: "grid_view",
    activeHref: ROUTES.MARKETPLACE },
  { href: `${ROUTES.MARKETPLACE}?category=electronics`, label: "Electronics", icon: "devices" },
  { href: `${ROUTES.MARKETPLACE}?category=textbooks`, label: "Textbooks", icon: "menu_book" },
  { href: `${ROUTES.MARKETPLACE}?category=housing`, label: "Housing", icon: "home_work" },
  { href: `${ROUTES.MARKETPLACE}?category=services`, label: "Services", icon: "handshake" },
];

const BOTTOM_LINKS = [
  { href: ROUTES.SETTINGS, label: "Settings", icon: "settings" },
  { href: "#help", label: "Help Center", icon: "help" },
];

export default function SideNav() {
  const pathname = usePathname();
  const currentUser = useCurrentUser();
  
  // Hide SideNav completely on product pages
  if (pathname.startsWith("/product/")) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === ROUTES.DASHBOARD) return pathname === ROUTES.DASHBOARD;
    return pathname.startsWith(href.split("?")[0] ?? "");
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 sticky top-16 h-[calc(100vh-64px)] bg-surface border-r border-outline-variant/20">
      {/* Campus info header */}
      <div className="px-6 py-6 mb-4 border-b border-outline-variant/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary-fixed rounded-xl flex items-center justify-center">
            <span
              className="material-symbols-outlined text-primary text-title"
              style={{ fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              location_on
            </span>
          </div>
          <div>
            <p className="font-bold text-body text-on-surface leading-tight">
              {currentUser?.universityName ?? "Stanford University"}
            </p>
            <p className="text-caption text-on-surface-variant">
              Verified Campus
            </p>
          </div>
        </div>
      </div>

      {pathname === ROUTES.SEARCH ? (
        <div className="flex-1 flex flex-col gap-6 px-6 overflow-y-auto">
          <section>
            <h4 className="text-small font-medium text-on-surface-variant uppercase tracking-wider mb-4">Category</h4>
            <div className="space-y-1">
              {["Textbooks", "Electronics", "Housing"].map((cat) => (
                <button key={cat} className={`w-full text-left font-medium rounded-lg px-4 py-2 flex items-center gap-3 transition-all duration-200 ${cat === "Textbooks" ? "bg-primary-container text-on-primary-container font-semibold" : "text-on-surface-variant hover:bg-surface-variant/50"}`}>
                  <span className="material-symbols-outlined text-title">
                    {cat === "Textbooks" ? "menu_book" : cat === "Electronics" ? "devices" : "home_work"}
                  </span>
                  {cat}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-small font-medium text-on-surface-variant uppercase tracking-wider mb-4">Price Range</h4>
            <div className="px-2">
              <input type="range" className="w-full h-1.5 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary" />
              <div className="flex justify-between mt-2 text-caption font-medium text-on-surface-variant">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
          </section>

          <section>
            <h4 className="text-small font-medium text-on-surface-variant uppercase tracking-wider mb-4">Condition</h4>
            <div className="space-y-2 px-2">
              {["Like New", "Gently Used", "Fair"].map(condition => (
                <label key={condition} className="flex items-center gap-3 text-small cursor-pointer text-on-surface">
                  <input type="checkbox" defaultChecked={condition === "Like New"} className="rounded border-outline-variant text-primary focus:ring-primary" />
                  {condition}
                </label>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <nav className="flex-1 flex flex-col gap-1 px-2 overflow-y-auto" aria-label="Sidebar navigation">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.activeHref ?? item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-small font-medium transition-all duration-200 ${
                  active
                    ? "bg-primary-container text-on-primary-container font-semibold"
                    : "text-on-surface-variant hover:bg-surface-variant/50"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary-container rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className="material-symbols-outlined text-title"
                  style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
      {/* Upgrade card + bottom links */}
      <div className="px-4 pb-6 space-y-4">
        {/* CampusX Premium upsell — matches design exactly */}
        <div className="bg-primary-fixed/20 p-4 rounded-xl text-center">
          <p className="text-small font-bold text-primary mb-2">
            CampusX Gold
          </p>
          <p className="text-caption text-on-surface-variant mb-3">
            Get 0% fee on your first 10 sales.
          </p>
          <button className="w-full bg-primary text-on-primary text-caption font-bold py-2 rounded-lg hover:opacity-90 active:scale-95 transition-all">
            Upgrade to Premium
          </button>
        </div>

        {/* Bottom util links */}
        <div className="flex flex-col gap-1">
          {BOTTOM_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2 text-small text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-all"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
