import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { VerifiedBadge } from "@/shared/components/ui/verified-badge"
import { Breadcrumbs } from "@/shared/components/ui/breadcrumbs"
import {
  MapPin, Heart, Info, Star, ArrowRight, BadgeDollarSign
} from "lucide-react"
import { getListingById } from "@/features/marketplace/services/listingService"
import { ChatButton } from "@/features/chat/components/ChatButton"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const listing = await getListingById(id)

  if (!listing) {
    return {
      title: "Product Not Found | CampusX",
      description: "The requested listing could not be found.",
    }
  }

  const title = `${listing.title} - $${listing.price} | CampusX Marketplace`
  const description = listing.description?.slice(0, 160) || `Buy ${listing.title} in ${listing.condition} condition on CampusX.`
  const mainImage = listing.images?.[0] || "/og-image.png"

  return {
    title,
    description,
    alternates: {
      canonical: `/product/${listing.id}`,
    },
    openGraph: {
      title,
      description,
      url: `/product/${listing.id}`,
      type: "website",
      images: [
        {
          url: mainImage,
          width: 800,
          height: 600,
          alt: `${listing.title} item photo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [mainImage],
    },
  }
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params
  const listing = await getListingById(id)
  
  if (!listing) {
    return notFound()
  }

  const mainImage = listing.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
  const sellerName = listing.seller?.displayName || "Verified Student"

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": listing.title,
    "image": listing.images && listing.images.length > 0 ? listing.images : [mainImage],
    "description": listing.description,
    "category": listing.category,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": listing.price,
      "itemCondition": listing.condition === "new" 
        ? "https://schema.org/NewCondition" 
        : "https://schema.org/UsedCondition",
      "availability": listing.status === "active" 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Person",
        "name": sellerName,
      }
    }
  }

  return (
    <div className="bg-background selection:bg-primary-container selection:text-on-primary-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="pt-8 pb-16 px-4 md:px-6 max-w-[1280px] mx-auto">
        <Breadcrumbs
          items={[
            { label: "Marketplace", href: "/marketplace" },
            { label: listing.category, href: `/marketplace?category=${listing.category}` },
            { label: listing.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ─── Left Column: Image Gallery (Bento) ─── */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-4 gap-3 h-[420px] md:h-[500px]">
              <div className="col-span-4 md:col-span-3 rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05),_0px_4px_12px_rgba(0,0,0,0.05)] relative group cursor-zoom-in bg-surface-container">
                <Image
                  src={mainImage}
                  alt={`${listing.title} main listing picture`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full font-label text-xs text-primary flex items-center gap-1.5 shadow-sm">
                  <VerifiedBadge className="w-3.5 h-3.5" />
                  Verified Student
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="hidden md:flex flex-col gap-3 h-full">
                {(listing.images && listing.images.length > 1 ? listing.images.slice(1, 4) : [mainImage]).map((img, i) => (
                  <div key={i} className="flex-1 rounded-xl overflow-hidden relative cursor-pointer opacity-80 hover:opacity-100 transition-opacity bg-surface-container">
                    <Image
                      src={img}
                      alt={`${listing.title} thumbnail preview ${i + 1}`}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-surface rounded-2xl p-6 md:p-8 border border-outline-variant/30">
              <h2 className="font-display text-xl font-bold text-on-surface mb-4">Item Description</h2>
              <div className="prose prose-sm text-on-surface-variant font-body leading-relaxed whitespace-pre-wrap">
                {listing.description || "No description provided by the seller."}
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant/30 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="block text-xs font-label text-on-surface-variant uppercase tracking-wider mb-1">Category</span>
                  <span className="font-semibold text-on-surface capitalize">{listing.category}</span>
                </div>
                <div>
                  <span className="block text-xs font-label text-on-surface-variant uppercase tracking-wider mb-1">Condition</span>
                  <span className="font-semibold text-on-surface capitalize">{listing.condition.replace("_", " ")}</span>
                </div>
                <div>
                  <span className="block text-xs font-label text-on-surface-variant uppercase tracking-wider mb-1">Listing Type</span>
                  <span className="font-semibold text-on-surface capitalize">{listing.listingType}</span>
                </div>
                <div>
                  <span className="block text-xs font-label text-on-surface-variant uppercase tracking-wider mb-1">Location</span>
                  <span className="font-semibold text-on-surface truncate block">{listing.meetupLocation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right Column: Details & Actions ─── */}
          <div className="lg:col-span-5">
            <div className="bg-surface rounded-2xl p-6 md:p-8 border border-outline-variant/30 sticky top-24 shadow-[0px_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-start justify-between gap-4 mb-4">
                <Badge variant="secondary" className="capitalize">
                  {listing.category}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-on-surface-variant font-label uppercase">Status:</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 capitalize">
                    {listing.status}
                  </span>
                </div>
              </div>

              {/* Single H1 for the page */}
              <h1 className="font-display text-2xl md:text-3xl font-bold text-on-surface mb-3 leading-snug">
                {listing.title}
              </h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display text-3xl md:text-4xl font-extrabold text-primary">
                  ${listing.price}
                </span>
                {listing.negotiable && (
                  <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                    Price Negotiable
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-body text-on-surface-variant mb-6 pb-6 border-b border-outline-variant/30">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Meetup at: <strong className="text-on-surface">{listing.meetupLocation}</strong></span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <ChatButton
                  sellerId={listing.sellerId}
                  product={{
                    id: listing.id,
                    title: listing.title,
                    thumbnailUrl: mainImage,
                    price: listing.price
                  }}
                  className="w-full h-12 text-base font-medium shadow-md shadow-primary/10"
                />
                {listing.negotiable && (
                  <Button variant="secondary" size="lg" className="w-full gap-2 bg-surface-container-highest hover:bg-outline-variant">
                    <BadgeDollarSign className="w-5 h-5" />
                    Make an Offer
                  </Button>
                )}
              </div>

              {/* Seller Info */}
              <div className="pt-6 border-t border-outline-variant/40">
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {sellerName.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-primary text-white p-0.5 rounded-full border-2 border-white">
                      <VerifiedBadge className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="font-bold text-on-surface font-body text-sm truncate">{sellerName}</span>
                      <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider font-label">Verified Student</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-body">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1">(Verified Peer)</span>
                    </div>
                  </div>
                  <Link href="/profile" className="text-primary font-bold text-xs hover:underline font-body shrink-0">
                    Profile
                  </Link>
                </div>

                <div className="bg-primary/5 p-4 rounded-xl flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs font-body text-on-surface-variant leading-relaxed">
                    <strong className="text-on-surface">CampusX Guarantee:</strong> All student sellers are verified with their official university email. Transactions are protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-[12px] border-t border-outline-variant/30 md:hidden z-50">
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <span className="text-primary font-bold text-xl font-display">${listing.price}</span>
            <span className="text-on-surface-variant font-label text-xs block uppercase tracking-wider truncate">{listing.title}</span>
          </div>
          <ChatButton 
            sellerId={listing.sellerId}
            product={{
              id: listing.id,
              title: listing.title,
              thumbnailUrl: mainImage,
              price: listing.price
            }}
            className="shrink-0 rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}
