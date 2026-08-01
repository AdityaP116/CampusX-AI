"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { PlusCircle, ArrowLeft } from "lucide-react";

export default function SellPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link 
          href={ROUTES.MARKETPLACE}
          className="inline-flex items-center text-small font-medium text-on-surface-variant hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Link>
        <h1 className="text-h2 font-bold text-on-surface">Create a Listing</h1>
        <p className="text-body text-on-surface-variant mt-2">
          List an item for sale, rent, or exchange in the marketplace.
        </p>
      </div>

      <div className="bg-surface-container rounded-2xl p-12 text-center border-2 border-dashed border-outline-variant">
        <PlusCircle className="w-16 h-16 text-primary mx-auto mb-4 opacity-80" />
        <h2 className="text-h3 font-bold text-on-surface mb-2">Coming Soon</h2>
        <p className="text-body text-on-surface-variant max-w-md mx-auto">
          The listing creation flow is currently under construction. Check back later to list your items!
        </p>
        <div className="mt-8">
          <Link
            href={ROUTES.MARKETPLACE}
            className="inline-flex items-center justify-center bg-primary text-on-primary px-6 py-3 rounded-xl font-semibold shadow-sm hover:opacity-90 transition-opacity"
          >
            Browse Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}
