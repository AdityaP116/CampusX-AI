"use client";

// =========================================================
// Wishlist Page
// Pixel-perfect conversion of design/1/my_wishlist
// =========================================================

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTES } from "@/constants/routes";

type ViewMode = "grid" | "list";

export default function WishlistPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeFilter, setActiveFilter] = useState("All Saved");

  const filters = [
    { label: "All Saved", count: 12 },
    { label: "Available", count: 8 },
    { label: "Price Drop", count: 3 },
    { label: "Sold", count: 4 },
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-xl gap-md">
        <div>
          <h1 className="font-bold text-h1 text-on-surface">Your Wishlist</h1>
          <p className="text-body text-on-surface-variant">Manage items you&apos;re watching and get notified of price drops.</p>
        </div>
        <div className="flex items-center bg-surface-container rounded-xl p-1 gap-1">
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-on-surface-variant hover:bg-surface-variant/50'}`}
          >
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-on-surface-variant hover:bg-surface-variant/50'}`}
          >
            <span className="material-symbols-outlined">view_list</span>
          </button>
        </div>
      </div>

      {/* Dashboard Filters */}
      <div className="flex flex-wrap items-center gap-md mb-lg">
        {filters.map(filter => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`px-4 py-2 rounded-full text-small font-medium transition-all ${
              activeFilter === filter.label 
                ? 'bg-on-surface text-surface' 
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Content Container */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
        <AnimatePresence>
          {WISHLIST_ITEMS.map((item, idx) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={idx} 
              className={`group bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-xl transition-all relative ${
                item.status === 'sold' ? 'opacity-80 grayscale-[0.5] bg-surface-container' : ''
              } ${viewMode === 'list' ? 'flex items-center' : ''}`}
            >
              <div className={viewMode === 'grid' ? 'aspect-[4/3] relative overflow-hidden' : 'w-32 h-32 flex-shrink-0 relative overflow-hidden m-4 rounded-xl'}>
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className={`w-full h-full object-cover ${item.status !== 'sold' ? 'group-hover:scale-105 transition-transform duration-500' : ''}`} 
                />
                
                {/* Overlay Badges */}
                {item.status === 'sold' && (
                  <div className="absolute inset-0 bg-on-surface/40 flex items-center justify-center">
                    <span className="px-6 py-2 bg-white text-on-surface rounded-full font-bold text-title shadow-2xl tracking-widest">SOLD</span>
                  </div>
                )}
                
                {item.status !== 'sold' && (
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.priceDrop && (
                      <span className="px-3 py-1 bg-tertiary text-white rounded-full text-caption font-bold flex items-center gap-1 shadow-lg">
                        <span className="material-symbols-outlined text-small">trending_down</span>
                        Price Drop
                      </span>
                    )}
                    {item.newPrice && (
                      <span className="px-3 py-1 bg-primary text-white rounded-full text-caption font-bold shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-small">new_releases</span>
                        New Price
                      </span>
                    )}
                    {item.available && (
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-on-surface rounded-full text-caption font-bold shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-small text-green-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        Available
                      </span>
                    )}
                  </div>
                )}

                <button className={`absolute top-4 right-4 h-10 w-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-error hover:bg-error-container transition-all ${item.status !== 'sold' ? 'shadow-lg active:scale-90' : ''}`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </button>
              </div>

              <div className={viewMode === 'grid' ? 'p-lg' : 'p-4 flex-1 flex flex-col justify-center'}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-bold text-title truncate pr-4 ${item.status === 'sold' ? 'text-outline-variant' : 'text-on-surface'}`}>
                    {item.title}
                  </h3>
                  <div className="text-right shrink-0">
                    <p className={`text-title font-bold ${item.status === 'sold' ? 'text-outline-variant' : 'text-primary'}`}>
                      {item.price}
                    </p>
                    {item.oldPrice && (
                      <p className="text-caption text-outline line-through">{item.oldPrice}</p>
                    )}
                  </div>
                </div>
                <p className={`text-small line-clamp-2 mb-lg ${item.status === 'sold' ? 'text-outline-variant' : 'text-on-surface-variant'}`}>
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between gap-sm">
                  {item.status === 'sold' ? (
                    <button className="flex-1 py-3 bg-outline-variant text-white rounded-xl font-bold cursor-not-allowed text-small" disabled>
                      Item No Longer Available
                    </button>
                  ) : (
                    <button className="flex-1 py-3 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95 duration-150 text-small">
                      Message Seller
                    </button>
                  )}
                  <button className="p-3 bg-surface-container-high text-on-surface rounded-xl hover:bg-surface-variant transition-all">
                    <span className="material-symbols-outlined">{item.status === 'sold' ? 'delete' : 'more_horiz'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State Illustration (Hidden by default, can be toggled if WISHLIST_ITEMS is empty) */}
      {WISHLIST_ITEMS.length === 0 && (
        <div className="flex flex-col items-center justify-center py-xxl text-center">
          <div className="w-64 h-64 mb-lg relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-[80px] text-primary/30">bookmark_border</span>
            </div>
          </div>
          <h2 className="font-bold text-h2 text-on-surface mb-2">No saved items yet</h2>
          <p className="text-body text-on-surface-variant max-w-md mx-auto mb-xl">
            Explore the marketplace and save items you&apos;re interested in to track their price and availability.
          </p>
          <Link 
            href={ROUTES.MARKETPLACE}
            className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg hover:shadow-primary/20 transition-all active:scale-95 inline-block"
          >
            Explore Marketplace
          </Link>
        </div>
      )}
    </div>
  );
}

const WISHLIST_ITEMS = [
  {
    title: "MacBook Air M2 (2022)",
    price: "$850",
    oldPrice: "$950",
    description: "Pristine condition, used for only one semester. Includes original charger and box.",
    status: "available",
    priceDrop: true,
    available: true,
    newPrice: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDscuvky4IXqScgExFSVfxL4kQqSHVTPuA10NAhjLQIRnunKW8zeiqAWTc722ZDRWDbHJB3-0aPHjXP5GJ-SafEB4CoqpOKiFBhrmZ1s0xOaL1SJ-sgGhcTh7Ns960xGONMXlBx0hGS2dCWnPuXMHRpPoSCsUL9SUBLqLi63bMAIVUuFiCM3OyeZQx-rg4_KJM39Ro9e7gGyGK4k2hfjXCPRvunHQdHHYgkf8JsjySLWkTq0A_chLimGpzaKG3HA8fgdQTcdu9a3WZ4"
  },
  {
    title: "Herman Miller Embody",
    price: "$420",
    oldPrice: null,
    description: "Light grey, Graphite base. Extremely comfortable for long study sessions. Great condition.",
    status: "available",
    priceDrop: false,
    available: true,
    newPrice: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-mHVpoToCSTFkcQtSB4qNUO6ONhh5hvJcQb7se9ItBWruA1fPigikoezqMmWa7vzWBknJzL6cRpktnjjCTGdm4vRKtYsjJSTCIYvOy-hClVBeL_BILpQ2qKDryRiS-FioveeWsYD3gOzaFroFZXb_9dXn6LwKTma_Oh5UCh8mFsIUTD1Oi9nUiT_hEYC1CwEcEj-wb61pQOnWryw9m0jUakPjcmUoJSpWM0aUPnRAUV7I4YhBcLbQ39CAashnqbXkq1Ck6SF5vGc_"
  },
  {
    title: "Sony A7III + 35mm Lens",
    price: "$1,200",
    oldPrice: null,
    description: "Full frame mirrorless. Low shutter count. Perfect for student film projects.",
    status: "sold",
    priceDrop: false,
    available: false,
    newPrice: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqn-KfMnS4daW-UXQE11GfvBqBp5045hphdJbVItHW1JZ9ZM1KcwyVQqmpLqAk7WSi5Khdo_AGSZ0cVdr6TVKRpdlMvFrgvL-E-uoqJLyT7pS3BPLbTMRWQo-O61Y5R6qcMe9dMZbwF8tNpVivNwCEC_SKlG1b5uXFnpE8I0V2butadPN0q8nRba24aSI0-Xt8uLqj32D3jB4A7rSuAViZRVj5fjbWXVeXTv0LcVTUNzO594mMCkeS6oPBSpw2taCpOOAKmwazeiw5"
  },
  {
    title: "VanMoof S3 Electric Bike",
    price: "$1,800",
    oldPrice: null,
    description: "The ultimate campus commuter. Anti-theft tracking, automatic shifting. Barely ridden.",
    status: "available",
    priceDrop: false,
    available: false,
    newPrice: true,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLZMPtlBgXTW13PeVQRD7eNqiIOLxo4uMEOXJ1yFTsbiB27PZiQFzCk4X2mkIzwKXJu5loaA08tsY2xA0xvwXV3ZKJ9qlo3btCI7B3UNlPmitIIm90BkdyIFDGEw0MFsNb50k6jK4YMNFlwg8OjMOdUlzrdFg2Xeeq6gODOhySwJu7JFKyGl0WMNsmgEeYkpJUbnajBm5esfFYshEF9m9U3rngL8vASGOQfv5lxu8bLFDv4uo0B4Dbps3m1GTeZ_tuH3tTB-Tshq4W"
  },
  {
    title: "Physics I-IV Bundle",
    price: "$120",
    oldPrice: null,
    description: "Complete set for freshman physics. No highlighting, almost new condition.",
    status: "available",
    priceDrop: false,
    available: true,
    newPrice: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXlbMlF4UHez2y7GMMXGxKsMv9kLh5IPKZH4nrv_EWXDUO_fBJs2C8DwilrXcI5Xnj1XJqtAf6Alhax3f3XH6mAuAuv0wou-4jyzTzdti_2snmHTc-lKMvIoTAUhS2Jny0JWpQrUX4Zt0xV3fJYNr5iY1Z4FQ-DU36BKrRJj3KRK6XL23LYPQ4Q3mQnG2uZmTt3_02DPGLUVe6oepM9sCV81SvgYMdiCDRsuFU-3iq6VqXNSJs6YE8Mk5djYPm55oC_wHQZcAUUvWE"
  }
];
