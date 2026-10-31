import Link from "next/link";
import { ArrowLeft, Search, Compass, AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | CampusX",
  description: "The page you are looking for might have been moved or does not exist.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-16 bg-surface">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <AlertCircle className="w-10 h-10" />
        </div>

        <span className="text-xs uppercase tracking-widest font-mono text-primary font-bold">
          Error 404
        </span>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mt-2 mb-3">
          Page not found
        </h1>

        <p className="text-on-surface-variant font-body text-sm md:text-base mb-8">
          Sorry, we couldn&apos;t find the page you were looking for. It may have expired, been sold, or moved to another link.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full gap-2 font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/marketplace" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full gap-2 border-outline hover:bg-surface-container">
              <Compass className="w-4 h-4" />
              Explore Marketplace
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-outline-variant/30 text-xs text-on-surface-variant">
          Need assistance? <Link href="/support" className="text-primary hover:underline font-medium">Contact campus support</Link>
        </div>
      </div>
    </div>
  );
}
