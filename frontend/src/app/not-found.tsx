import Link from "next/link";
import type { Metadata } from "next";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center hero-gradient">
      {/* Ambient blobs */}
      <div
        className="floating-blob bg-primary w-full max-w-md h-[400px] -top-24 -left-24"
        aria-hidden="true"
      />
      <div
        className="floating-blob bg-secondary w-[300px] h-[300px] bottom-0 right-0"
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-6 max-w-md">
        {/* Brand */}
        <Link
          href={ROUTES.HOME}
          className="inline-block font-bold text-primary text-title mb-4"
          aria-label="CampusX home"
        >
          CampusX
        </Link>

        {/* 404 number */}
        <div className="text-[120px] font-extrabold text-on-surface opacity-5 leading-none select-none">
          404
        </div>

        <h1 className="text-h2 font-bold text-on-surface -mt-8">
          Page not found
        </h1>
        <p className="text-body text-on-surface-variant">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href={ROUTES.MARKETPLACE}
            className="bg-primary text-on-primary px-8 py-3 rounded-xl font-semibold hover:scale-[1.02] active:scale-95 transition-transform shadow-[var(--shadow-primary)]"
          >
            Browse Marketplace
          </Link>
          <Link
            href={ROUTES.HOME}
            className="border border-outline-variant text-on-surface px-8 py-3 rounded-xl font-semibold hover:bg-surface-container-low transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
