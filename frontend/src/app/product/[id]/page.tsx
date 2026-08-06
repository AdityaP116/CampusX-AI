import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { VerifiedBadge } from "@/shared/components/ui/verified-badge"
import {
  ChevronRight, MapPin, Heart, MessageCircle, BadgeDollarSign,
  Info, Star, ArrowRight
} from "lucide-react"
import { getListingById } from "@/features/marketplace/services/listingService"
import { ChatButton } from "@/features/chat/components/ChatButton"

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  // Wait, if id is a mock ID like '1' or '2', we might want a mock fallback for design review
  // But for now let's just fetch it. If not found, show notFound()
  const listing = await getListingById(id)
  
  if (!listing) {
    // Return a temporary mock for the demo if it's one of the mock IDs
    if (['1', '2', '3', '4'].includes(id)) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold">Mock Listing {id}</h1>
          <p className="text-on-surface-variant">This is a mock listing from the design.</p>
        </div>
      )
    }
    return notFound()
  }

  const mainImage = listing.images?.[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuDGYrccu0TBbWExHt9MdZCM3sEpJolaBwcl7hink0eppj9lad_IgtMOEwlS5bxkH0qmzXFVSKP5I9Gb4hEmAdzfeDINFwU6LYFaDElYtf7gnno-qXrtV8DRrs8HSnGMsjda2Q5bYgQIm0Kbp-_oNKjgyb3iVtcy2y1dB9XwLMQ8skU--S_x-V-FGH9cfs204LsaKXqvutVgrc8_rM-HSkJ0AeRrgUKJ5f5cQXF1KGGS6692v2Hyk0Z6"

  return (
    <div className="bg-background selection:bg-primary-container selection:text-on-primary-container">
      <main className="pt-8 pb-16 px-4 md:px-6 max-w-[1280px] mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-on-surface-variant font-label text-xs mb-8">
          <Link href="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/marketplace" className="hover:text-primary transition-colors capitalize">{listing.category}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-on-surface font-semibold">{listing.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ─── Left Column: Image Gallery (Bento) ─── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Bento Image Grid */}
            <div className="grid grid-cols-4 gap-3 h-[420px] md:h-[500px]">
              {/* Main large image */}
              <div className="col-span-4 md:col-span-3 rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05),_0px_4px_12px_rgba(0,0,0,0.05)] relative group cursor-zoom-in">
                <img
                  src={mainImage}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full font-label text-xs text-primary flex items-center gap-1.5 shadow-sm">
                  <VerifiedBadge className="w-3.5 h-3.5" />
                  Verified Authentic
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="hidden md:flex flex-col gap-3 col-span-1">
                {(listing.images?.slice(1, 3) || []).map((src, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity border-2 border-transparent hover:border-primary/30"
                  >
                    <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                {listing.images?.length! > 3 && (
                  <div className="flex-1 rounded-xl overflow-hidden shadow-sm cursor-pointer relative group">
                    <img
                      src={listing.images![3]}
                      alt="More photos"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-2xl font-headline">
                      +{listing.images!.length - 3}
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
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwOtTX_Du0IgM0lVMhzjE4vWowv9gRvCZ-lFjAE0lHD_9-N6k4-crh9DVG177ffop3io2JA2R-6bB709ZQ4hazncDC5bwBbVbPk7QLy6hu9MjnWdsMEcO_QXvf-DijjSdqlQyddaAO6k_e1TcCPyPwduO7_D-0w3yUX59StYp0ZReXRu_JFA5-_AlsFCndAZIt58fCmQAGZnJm1KLURC7zY10ezd79lzu76LS7JBrZSiixDqRlWWHe"
                        alt="Alex Rivera"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-primary text-white p-0.5 rounded-full border-2 border-white">
                        <VerifiedBadge className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-bold text-on-surface font-body">Alex Rivera</span>
                        <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider font-label">Verified Student</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-on-surface-variant font-body">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        <Star className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
                        <span className="ml-1">(48 sales)</span>
                      </div>
                    </div>
                    <Link href="/profile" className="text-primary font-bold text-sm hover:underline font-body shrink-0">
                      View Profile
                    </Link>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-xl flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs font-body text-on-surface-variant leading-relaxed">
                      <span className="font-bold text-on-surface">CampusX Guarantee:</span> All student sellers are verified with their .edu email. Transactions are protected.
                    </p>
                  </div>
                </div>
              </div>

              {/* Campus Map Snippet */}
              <div className="rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05),_0px_4px_12px_rgba(0,0,0,0.05)] h-48 relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBseTN9h-VMd_K5w1ymAfcviFSw5ptwg3pIAQI6C6QMt5u-wSeiHrdwLSBA00kUIFBhGmynKxVmHcLM5KGwTyjyAoXdOsT3RNMJQl4JxKNs2sNOLX2TGCSdjnbv0C3VU1IfXnP5Ev1oTEUI4FgEy4afuEqGIrYH_LqMPUol8OraCWMBmiw7ANzOoSXH84ICXCmMjBtALINEjUO4-TtoP_LymHotRf0emwrCufSFg5m9WFYUrvEVzcXZ"
                  alt="Campus Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-white text-sm font-semibold font-body">Pick up near Main Quad</span>
                    <button className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-label text-xs hover:bg-white/30 transition-colors">
                      Open Maps
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items */}
        <section className="mt-24">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-headline text-3xl font-bold text-on-surface mb-1">More from Electronics</h2>
              <p className="text-on-surface-variant font-body">Other students at your university are selling these</p>
            </div>
            <Link href="/marketplace" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all font-body">
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Studio Headsets", price: "$180", desc: "Perfect condition, used for one project.", seller: "Jordan K.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVVnCfG7WsGaqr7wAd9RPzBMm55so3AYCz0wriEZslNhUvlrxyQ9LnN2oSnru5dmLph-vtbXqn6mK87LI9DgcqFb8Upd26VBaJ2aexzEtZBl2CWcrxdgubKSX8tdVRxDQJ0EscsKik1IQu9HDnT7oWBJtXx3TmdAef3vtbsGMwIOAA7D2WQZMggf_aG-kptOkMxOR50UF0jyNS-vIOGvP9LfWZMD6QtcudrATHe-rLDHJ_ZMuNaWm8" },
              { title: 'Creative Tablet 11"', price: "$450", desc: "Includes pencil and paper-like screen protector.", seller: "Sarah M.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXaGMugXtzqeV8c1hxHKoqsC6EvwcHPRdazg02d_6tUkmbBUEmyUSKHkz6wYYYY3_9SKE1bCGQLCHUK6AA3VJkzxQ6roM170ic6oNaxpQHg7ZXs5UiHQxEKcyLjm-aV5mQS4sI16L7H8RYuJxqb6MD9hMrO9XeP8kjzNk3EnNWpOypo9Jzm9qZMI47pmT2hL2FzzT9SKHi5_txekoap-qkgPt0AZc7qrSBe8mna3Rv9SS8WcDagCjB" },
              { title: "Mech Keyboard", price: "$75", desc: "Blue switches, great for coding sessions.", seller: "Leo T.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuANGxSGSjdRm4Og_YpFhn_0sEUXUgKgHaJRP6FPJAHUN6VQvy3kzar6huW8KCNlmLeCntpzLKSR08npLFwu3tfSuZe0tVMFVnmZRT6ks1xy3-sioKrtdcWox4NvwKBEHGJhA3_m8fQboqArAKNSbnTdUDGItjla7E0ekcAQDCAZ3G9Z3KckM3YTqhigjAHr2RI5J4QY6vpPiU7CkTDCYOAB0jDPNT16x9Yo0M7AHE0ypsecbzR5mzpj" },
              { title: "Mirrorless Camera", price: "$890", desc: "Low shutter count, like new condition.", seller: "Emma W.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuATmhcF4YKTLD_WAtz9IygpDUvo63NDc2BJocPN-AgRee1aWosFZvl0wdM1QWuh8Jp92QC0nxr68dWMhg40HtisQthuxqJmHrLirAB3-FhnOMPzpaknJl7PGzf-_4apvEZRDpnvXwiehen3FSvIsu6G9e5zpzRrU60g8Y7l65o03D9ea9darKpod5UG-B0NUZh-TVFbJ2FXuVFItSbYvxYbEOUr7dyixQNFVnXTAv-9A9XpkigxmMzW" },
            ].map((item, i) => (
              <Link key={i} href={`/product/${i + 10}`} className="group bg-white rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05),_0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)] border border-outline-variant/20 transition-all duration-200 cursor-pointer">
                <div className="h-48 overflow-hidden relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:text-error text-secondary transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors">{item.title}</h3>
                    <span className="text-primary font-bold font-body">{item.price}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-4 font-body">{item.desc}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-surface-container-high overflow-hidden shrink-0" />
                    <span className="font-label text-xs text-on-surface-variant">{item.seller}</span>
                    <VerifiedBadge className="w-3.5 h-3.5 ml-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-[12px] border-t border-outline-variant/30 md:hidden z-50">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <span className="text-primary font-bold text-xl font-display">$1,299</span>
            <span className="text-on-surface-variant font-label text-xs block uppercase tracking-wider">Premium Laptop Pro</span>
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
