import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { VerifiedBadge } from "@/shared/components/ui/verified-badge"
import {
  ChevronRight, MapPin, Heart,
  Info, Star, ArrowRight, BadgeDollarSign
} from "lucide-react"
import { getListingById } from "@/features/marketplace/services/listingService"
import { ChatButton } from "@/features/chat/components/ChatButton"

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const listing = await getListingById(id)
  
  if (!listing) {
    return notFound()
  }

  const mainImage = listing.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
  const sellerName = listing.seller?.displayName || "Verified Student"

  return (
    <div className="bg-background selection:bg-primary-container selection:text-on-primary-container">
      <main className="pt-8 pb-16 px-4 md:px-6 max-w-[1280px] mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-on-surface-variant font-label text-xs mb-8">
          <Link href="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/marketplace" className="hover:text-primary transition-colors capitalize">{listing.category}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-on-surface font-semibold truncate max-w-[200px]">{listing.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ─── Left Column: Image Gallery (Bento) ─── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Bento Image Grid */}
            <div className="grid grid-cols-4 gap-3 h-[420px] md:h-[500px]">
              {/* Main large image */}
              <div className="col-span-4 md:col-span-3 rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05),_0px_4px_12px_rgba(0,0,0,0.05)] relative group cursor-zoom-in bg-surface-container">
                <img
                  src={mainImage}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full font-label text-xs text-primary flex items-center gap-1.5 shadow-sm">
                  <VerifiedBadge className="w-3.5 h-3.5" />
                  Verified Student
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="hidden md:flex flex-col gap-3 col-span-1">
                {(listing.images?.slice(1, 3) || []).map((src, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity border-2 border-transparent hover:border-primary/30 bg-surface-container"
                  >
                    <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                {listing.images && listing.images.length > 3 && (
                  <div className="flex-1 rounded-xl overflow-hidden shadow-sm cursor-pointer relative group bg-surface-container">
                    <img
                      src={listing.images[3]}
                      alt="More photos"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-2xl font-headline">
                      +{listing.images.length - 3}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description & Specs */}
            <div className="space-y-6 mt-2">
              <section>
                <h2 className="font-headline text-xl font-bold text-on-surface mb-3">Description</h2>
                <p className="text-on-surface-variant font-body leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </p>
              </section>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Condition", value: listing.condition },
                  { label: "Category", value: listing.category },
                  { label: "Type", value: listing.listingType },
                  { label: "Negotiable", value: listing.negotiable ? "Yes" : "No" },
                ].map((spec) => (
                  <div key={spec.label} className="p-4 bg-surface-container-low rounded-xl">
                    <span className="text-on-surface-variant font-label text-[10px] block mb-1 uppercase tracking-wider">
                      {spec.label}
                    </span>
                    <span className="text-on-surface font-semibold font-body capitalize">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Right Column: Sticky Pricing Card ─── */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-5">
              {/* Pricing Card */}
              <div className="bg-white rounded-2xl p-7 shadow-[0px_1px_2px_rgba(0,0,0,0.05),_0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="font-headline text-2xl font-bold text-on-surface mb-1">{listing.title}</h1>
                    <div className="flex items-center gap-1.5 text-on-surface-variant font-body text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{listing.meetupLocation}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-secondary hover:text-error">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-bold text-primary font-display">${listing.price}</span>
                </div>

                <div className="space-y-3">
                  <ChatButton 
                    sellerId={listing.sellerId}
                    product={{
                      id: listing.id,
                      title: listing.title,
                      thumbnailUrl: mainImage,
                      price: listing.price
                    }}
                    className="w-full"
                  />
                  {listing.negotiable && (
                    <Button variant="secondary" size="lg" className="w-full gap-2 bg-surface-container-highest hover:bg-outline-variant">
                      <BadgeDollarSign className="w-5 h-5" />
                      Make an Offer
                    </Button>
                  )}
                </div>

                {/* Seller Info */}
                <div className="mt-7 pt-6 border-t border-outline-variant/40">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {sellerName.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-primary text-white p-0.5 rounded-full border-2 border-white">
                        <VerifiedBadge className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-bold text-on-surface font-body">{sellerName}</span>
                        <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider font-label">Verified Student</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-on-surface-variant font-body">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="ml-1">(Verified Peer)</span>
                      </div>
                    </div>
                    <Link href="/profile" className="text-primary font-bold text-sm hover:underline font-body shrink-0">
                      Profile
                    </Link>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-xl flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs font-body text-on-surface-variant leading-relaxed">
                      <span className="font-bold text-on-surface">CampusX Guarantee:</span> All student sellers are verified with their official university email. Transactions are protected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-[12px] border-t border-outline-variant/30 md:hidden z-50">
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
