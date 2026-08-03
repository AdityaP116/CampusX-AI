import * as React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full py-12 md:py-16 bg-surface-container-lowest dark:bg-surface-container-highest border-t border-outline-variant/30 mt-auto">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-8 max-w-[1280px]">
        <div className="flex flex-col items-center md:items-start gap-2">
          <img src="/logo.png" alt="CampusX Logo" className="h-10 w-10 rounded-full object-cover opacity-90 grayscale hover:grayscale-0 transition-all" />
          <p className="text-sm font-body text-on-surface-variant text-center md:text-left max-w-xs mt-1">
            © {new Date().getFullYear()} CampusX. Premium Verified Marketplace.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/terms" className="text-sm font-body text-on-surface-variant hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-sm font-body text-on-surface-variant hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/safety" className="text-sm font-body text-on-surface-variant hover:text-primary transition-colors">
            Student Safety
          </Link>
          <Link href="/help" className="text-sm font-body text-on-surface-variant hover:text-primary transition-colors">
            Help Center
          </Link>
          <Link href="/support" className="text-sm font-body text-on-surface-variant hover:text-primary transition-colors">
            Support
          </Link>
        </div>
      </div>
    </footer>
  )
}
