"use client"

import * as React from "react"
import { Compass, List, MessageSquare, Heart, Settings } from "lucide-react"
import Link from "next/link"
import { useMarketplaceStore, type Category } from "@/shared/store/useMarketplaceStore"

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    category,
    setCategory,
    condition,
    setCondition,
    maxPrice,
    setPriceRange,
    resetFilters,
  } = useMarketplaceStore()

  return (
    <div className="flex flex-1 min-h-[calc(100vh-64px)] relative">
      {/* SideNavBar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 fixed left-0 top-16 h-[calc(100vh-64px)] bg-surface-container-low dark:bg-inverse-surface border-r border-outline-variant/30 z-40 overflow-y-auto no-scrollbar pb-6">
        <div className="p-4 space-y-2">
          <div className="mb-4 px-2 pt-2">
            <h3 className="font-headline text-base font-bold text-primary">Marketplace</h3>
            <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">Verified Community</p>
          </div>
          
          <nav className="space-y-1">
            <Link href="/marketplace" className="flex items-center gap-3 px-4 py-2 bg-primary-container text-on-primary-container rounded-lg font-bold font-label text-sm transition-colors">
              <Compass className="h-4 w-4" /> Browse
            </Link>
            <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors font-label text-sm">
              <List className="h-4 w-4" /> My Listings
            </Link>
            <Link href="/messages" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors font-label text-sm">
              <MessageSquare className="h-4 w-4" /> Chats
            </Link>
            <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors font-label text-sm">
              <Heart className="h-4 w-4" /> Wishlist
            </Link>
            <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors font-label text-sm">
              <Settings className="h-4 w-4" /> Settings
            </Link>
          </nav>
          
          <div className="pt-6 pb-2 px-2 mt-4 border-t border-outline-variant/30 flex justify-between items-center">
            <h4 className="font-label text-[10px] uppercase tracking-widest text-outline">Quick Filters</h4>
            <button
              onClick={() => resetFilters()}
              className="text-[11px] text-primary hover:underline font-label font-bold cursor-pointer"
            >
              Reset
            </button>
          </div>
          
          <div className="space-y-6 px-2">
            <div>
              <label className="font-label text-xs text-on-surface-variant block mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full bg-white border border-outline-variant rounded-lg px-2 py-1.5 text-sm font-body focus:ring-1 focus:ring-primary outline-none text-on-surface"
              >
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="textbooks">Textbooks</option>
                <option value="furniture">Furniture</option>
                <option value="clothing">Clothing</option>
                <option value="sports">Sports</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-label text-xs text-on-surface-variant">Max Price</label>
                <span className="font-label text-xs font-bold text-primary">
                  {maxPrice ? `$${maxPrice}` : "Any"}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="25"
                value={maxPrice ?? 1000}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  setPriceRange(null, val >= 1000 ? null : val)
                }}
                className="w-full h-1 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-2 font-label text-xs text-outline">
                <span>$0</span>
                <span>$1,000+</span>
              </div>
            </div>
            
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={condition === "like-new"}
                  onChange={(e) => setCondition(e.target.checked ? "like-new" : "any")}
                  className="rounded text-primary focus:ring-primary w-4 h-4 border-outline-variant"
                />
                <span className="font-body text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Like New Only</span>
              </label>
            </div>
          </div>
          
          <div className="pt-6 mt-4">
            <Link href="/create" className="flex items-center justify-center w-full bg-primary-container text-on-primary-container py-3 rounded-xl font-bold font-label text-sm hover:brightness-95 active:scale-95 transition-all shadow-sm">
              List an Item
            </Link>
          </div>
        </div>
      </aside>
      
      <div className="flex-1 md:ml-64 w-full">
        {children}
      </div>
    </div>
  )
}
