"use client";

// =========================================================
// Footer — Shared footer component
// Matches design/1/landing_page/code.html footer exactly
// =========================================================

import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const PLATFORM_LINKS = [
  { href: ROUTES.MARKETPLACE, label: "Marketplace" },
  { href: ROUTES.VERIFY_EMAIL, label: "Verification" },
  { href: "#safety", label: "Safety Rules" },
  { href: "#stories", label: "Success Stories" },
];

const SUPPORT_LINKS = [
  { href: "#help", label: "Help Center" },
  { href: "#terms", label: "Terms of Service" },
  { href: "#privacy", label: "Privacy Policy" },
  { href: "#trust", label: "Trust Center" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container py-xl border-t border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-gutter">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2 space-y-6">
            <Link
              href={ROUTES.HOME}
              className="font-bold text-title text-primary tracking-tight inline-block"
              aria-label="CampusX home"
            >
              CampusX
            </Link>
            <p className="text-body text-on-surface-variant max-w-xs">
              Elevating the student trading experience with security, style,
              and community at its core.
            </p>
            {/* Social icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-surface-variant/50 flex items-center justify-center hover:bg-primary/10 hover:text-primary text-on-surface-variant transition-all"
                aria-label="Email"
              >
                <span className="material-symbols-outlined text-title" aria-hidden="true">
                  alternate_email
                </span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-surface-variant/50 flex items-center justify-center hover:bg-primary/10 hover:text-primary text-on-surface-variant transition-all"
                aria-label="Community"
              >
                <span className="material-symbols-outlined text-title" aria-hidden="true">
                  hub
                </span>
              </a>
            </div>
          </div>

          {/* Platform links */}
          <div className="space-y-4">
            <h5 className="text-title font-semibold text-on-surface">
              Platform
            </h5>
            <ul className="space-y-2 text-on-surface-variant">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-body hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div className="space-y-4">
            <h5 className="text-title font-semibold text-on-surface">
              Support
            </h5>
            <ul className="space-y-2 text-on-surface-variant">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-body hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between gap-4 text-caption text-on-surface-variant">
          <p>© 2024 CampusX Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Verified in 450+ Universities</span>
            <span>Safe Campus Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
