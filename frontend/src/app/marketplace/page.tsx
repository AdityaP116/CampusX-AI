"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, MapPin, Heart, ShoppingCart, Timer, Verified, Loader2 } from "lucide-react"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Card } from "@/shared/components/ui/card"
import { FadeIn } from "@/shared/components/ui/fade-in"
import { useListings } from "@/features/marketplace/hooks/useListings"

export default function MarketplacePage() {
  const { data: listings = [], isLoading } = useListings()

  const featured = listings.slice(0, 4)
  const latest = listings.slice(4)

  return (
    <div className="p-6 md:p-8 max-w-[1280px] mx-auto w-full">
      {/* Hero/Header Section */}
      <FadeIn>
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold text-on-surface mb-2 tracking-tight">Explore Listings</h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-on-surface-variant font-body text-base max-w-xl">
            Find premium deals from verified students in your campus area. All listings are manually reviewed for safety.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-label text-sm text-outline">Sort by:</span>
            <button className="flex items-center gap-1 font-body text-sm font-semibold text-primary hover:bg-primary/5 px-2 py-1 rounded-md transition-colors">
              Recent Listings <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      </FadeIn>

      {isLoading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <>
          {/* Featured Listings (Bento Grid Style) */}
          {featured.length > 0 && (
            <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-2 gap-6 mb-12">
              {/* Large Feature Card (Index 0) */}
              {featured[0] && (
                <Link href={`/product/${featured[0].id}`} className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05),_0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-lg transition-all group relative border border-transparent hover:border-primary/20 block cursor-pointer">
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full font-label text-xs text-primary font-bold shadow-sm flex items-center gap-1.5">
                      <Verified className="w-4 h-4" /> Verified
                    </span>
                  </div>
                  <div className="h-64 md:h-full w-full bg-surface-container relative">
                    <img 
                      src={featured[0].images?.[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuDGYrccu0TBbWExHt9MdZCM3sEpJolaBwcl7hink0eppj9lad_IgtMOEwlS5bxkH0qmzXFVSKP5I9Gb4hEmAdzfeDINFwU6LYFaDElYtf7gnno-qXrtV8DRrs8HSnGMsjda2Q5bYgQIm0Kbp-_oNKjgyb3iVtcy2y1dB9XwLMQ8skU--S_x-V-FGH9cfs204LsaKXqvutVgrc8_rM-HSkJ0AeRrgUKJ5f5cQXF1KGGS6692v2Hyk0Z6"} 
                      alt={featured[0].title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-80 font-label">{featured[0].category}</span>
                    <h2 className="font-headline text-2xl font-bold mt-1 group-hover:text-primary-fixed transition-colors line-clamp-1">{featured[0].title}</h2>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold font-body">${featured[0].price}</span>
                      <span className="flex items-center gap-1.5 font-label text-sm text-white/90">
                        <MapPin className="w-4 h-4" /> {featured[0].meetupLocation || "Campus"}
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Side Card 1 (Index 1) */}
              {featured[1] && (
                <Link href={`/product/${featured[1].id}`} className="md:col-span-2 bg-white rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05),_0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-md transition-all group flex flex-row border border-transparent hover:border-primary/10 cursor-pointer h-48 md:h-auto">
                  <div className="w-1/3 bg-surface-container h-full overflow-hidden shrink-0">
                    <img 
                      src={featured[1].images?.[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuCG_C0SuT7HNbHviByGMenPjPEaNvSm2zBSlBWKTyTjVrb8VPlsihKhQR79FoPqTpV_JwUcBlSIlpw484nQWMTySTa4Q7nOiWXcYNZ8Ly9dzzpABIH8We2WVyQkgqnN_0TNOu74gHYSJGxUBPcQ0oo989N4lzHuuJyUr4ZCGSkXgsAjX3ytqm3SxfAJWXrAos8a2Se0JVEuCIlDcbwGY7uRfElVxNzl1-afRKGwe3vzW2Rq0L6EkXqu"} 
                      alt={featured[1].title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-label text-xs text-primary font-bold uppercase tracking-wider">{featured[1].category}</span>
                        <Heart className="w-5 h-5 text-outline group-hover:text-error transition-colors" />
                      </div>
                      <h3 className="font-headline text-lg font-bold text-on-surface mt-1 group-hover:text-primary transition-colors line-clamp-1">{featured[1].title}</h3>
                      <p className="text-sm font-body text-on-surface-variant mt-1 line-clamp-1">{featured[1].description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xl font-bold text-primary font-body">${featured[1].price}</span>
                      <button className="p-2.5 rounded-full bg-primary-container text-white active:scale-95 transition-transform shadow-sm hover:brightness-95">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              )}

              {/* Side Card 2 (Index 2) */}
              {featured[2] && (
                <Link href={`/product/${featured[2].id}`} className="md:col-span-1 bg-white rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05),_0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-md transition-all group border border-transparent hover:border-primary/10 cursor-pointer">
                  <div className="h-40 bg-surface-container relative overflow-hidden">
                    <img 
                      src={featured[2].images?.[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuBhvcxS-gYOHURZceI15rjfZRSuSM0Kdot8Tk222usFmJLgf_VNJEOp97btuUMik_B4YbQ-VuJzN8Dc6fE_cYRLuPyGynOxKBk5YYyN2m9cLXT2buapfxvu7mJNOteO_DBMM09wZcxv4eUr36_yMD67hBHHTLACLSmw1P-UGNnBBX9fz1gKNBZItsaiNaZj1pRdgwT5e2hRYgbd6e11xMM8D4-ini8Mc4TbhUShxhwRD0zofOgKWQd6"} 
                      alt={featured[2].title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-4">
                    <span className="font-label text-[10px] uppercase font-bold text-outline tracking-wider">{featured[2].category}</span>
                    <h3 className="font-headline text-base font-bold text-on-surface mt-1 group-hover:text-primary transition-colors line-clamp-1">{featured[2].title}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-primary font-body">${featured[2].price}</span>
                      <div className="flex items-center gap-1 font-label text-[10px] text-outline">
                        <Timer className="w-3.5 h-3.5" /> 2h ago
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Side Card 3 (Index 3) */}
              {featured[3] && (
                <Link href={`/product/${featured[3].id}`} className="md:col-span-1 bg-white rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05),_0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-md transition-all group border border-transparent hover:border-primary/10 cursor-pointer">
                  <div className="h-40 bg-surface-container relative overflow-hidden">
                    <img 
                      src={featured[3].images?.[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ4-53Cvxit9bKc8ibNYXVCFAXTKa7QJWqKrWZQDQ7sr_QUVWjWuo6-Mnbdel_DKJEYSCRV30ichKz8YYWzG4Nie3oQaGOg8gv-SxLjvC0ajAq8ult6e46QuN59ibXtlezlUE_o2KOlyR66hpjLWk5XRkVPiGGrtG1kstCIzcJuZUhYPyerSd8dvJGEanBBZYi_zi0HhefQoP0kUi7VrTng7yK79xVisqGXBiMLP61YaQ_u07y4yG5"} 
                      alt={featured[3].title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-4">
                    <span className="font-label text-[10px] uppercase font-bold text-outline tracking-wider">{featured[3].category}</span>
                    <h3 className="font-headline text-base font-bold text-on-surface mt-1 group-hover:text-primary transition-colors line-clamp-1">{featured[3].title}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-primary font-body">${featured[3].price}</span>
                      <div className="flex items-center gap-1 font-label text-[10px] text-outline">
                        <Timer className="w-3.5 h-3.5" /> 5h ago
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            </FadeIn>
          )}

          {/* Standard Grid for more items */}
          {latest.length > 0 && (
            <FadeIn delay={0.2}>
            <div className="mb-12">
              <h2 className="font-headline text-2xl font-bold mb-6 flex items-center gap-4 text-on-surface">
                Latest Items 
                <span className="h-px flex-1 bg-outline-variant/30"></span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {latest.map((item) => (
                  <Link key={item.id} href={`/product/${item.id}`} className="bg-white rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05),_0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-md transition-all group border border-transparent hover:border-primary/10 cursor-pointer flex flex-col">
                    <div className="h-48 bg-surface-container relative overflow-hidden">
                      <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80'} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-label text-[10px] uppercase font-bold text-outline tracking-wider">{item.category}</span>
                        <Verified className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-headline text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
                      <div className="flex items-center justify-between mt-auto pt-4">
                        <span className="font-bold text-on-surface text-lg font-body">${item.price}</span>
                        <span className="text-primary font-bold font-label text-xs uppercase tracking-wider hover:underline">View</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            </FadeIn>
          )}
        </>
      )}

      {/* Load More Section */}
      <div className="flex justify-center py-8">
        <Button variant="outline" size="lg" className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white font-bold transition-all shadow-sm">
          Load More Listings
        </Button>
      </div>

      {/* Mobile FAB */}
      <Link href="/create" className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center z-50 active:scale-95 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </Link>
    </div>
  )
}
