"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": process.env.NEXT_PUBLIC_SITE_URL || "https://campusx.market"
      },
      ...items.map((it, idx) => ({
        "@type": "ListItem",
        "position": idx + 2,
        "name": it.label,
        ...(it.href ? { "item": `${process.env.NEXT_PUBLIC_SITE_URL || "https://campusx.market"}${it.href}` } : {})
      }))
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaList) }}
      />
      <ol className="flex items-center flex-wrap gap-2 text-xs md:text-sm text-on-surface-variant">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-outline shrink-0" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded capitalize"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-on-surface capitalize truncate max-w-[200px]" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

