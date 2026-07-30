"use client";

// =========================================================
// User Dashboard
// Pixel-perfect conversion of design/1/user_dashboard
// =========================================================

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCurrentUser } from "@/store/auth.store";
import { ROUTES } from "@/constants/routes";
import { formatPrice, formatRelativeTime, getGreeting } from "@/utils";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const PERFORMANCE_STATS = [
  {
    id: "views",
    label: "Profile Views",
    value: "1,284",
    trend: "+12.5%",
    trendColor: "text-primary",
    icon: "visibility",
    iconBg: "bg-primary-fixed/30",
    iconColor: "text-primary",
    chart: "line",
  },
  {
    id: "listings",
    label: "Active Listings",
    value: "14",
    trend: "8 Active",
    trendColor: "text-secondary",
    icon: "inventory_2",
    iconBg: "bg-secondary-fixed/30",
    iconColor: "text-secondary",
    chart: "bar",
  },
  {
    id: "exchanges",
    label: "Successful Exchanges",
    value: "26",
    trend: "98% Score",
    trendColor: "text-tertiary",
    icon: "handshake",
    iconBg: "bg-tertiary-fixed/30",
    iconColor: "text-tertiary",
    chart: "stars",
  },
];

const MOCK_LISTINGS = [
  {
    id: "1",
    title: "iPad Pro 12.9 (M1)",
    price: 750,
    type: "SELL",
    views: 124,
    status: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArB8v4frqriVPkn2Hald4NuhAytqcVmL_vHW3NqJZa429QS1u98RIvQkwXfnJTjB0NKWF9YqpcSAafh7wEf94Eqnde2OEqAF6-38g60LQMQYH1Y2s_FuCUnTOo5XkjX3Q6Ish_5g0W2fy3ZF8lBSJg5qWuPBxVqszDq3zJgsInKbFTrahZW3jw8ajHyHaqcPFAZ8-cpzTEHJiycoSG1ZfMX0ujZHHbyoywp_nmx2FbOeRIVnI-25ATxFvRp_sDAcCWoUtz2WgA8FUR",
  },
  {
    id: "2",
    title: "Calculus Early Transcendentals",
    price: 45,
    type: "SELL",
    views: 89,
    status: "pending",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4UUmTS4hApBMP2u2eXD-eKEnPbR7EUKYXbSiDs-lqHkVHm4Hey8TveLQAB9u75kiS2rOOwZJFsfTr0iJA0-GJqeW8D-JVteugOBZieiQJ4VesVZ2JRRMBXZCC7CCBPQRBJu2y_owh09vBNOBWOeeTC4klHzPvoNiOclfWAVBpdMEygurfCBv8FMQt5FNNVrjQHHiAqJDRnw6aYlXdiJcgtyDOp8UzVSx8fQPVlt7rwtkaatr6hqMf2fpWlYSZuo-6o0vJkXY7pzOU",
  },
];

const MOCK_MESSAGES = [
  {
    id: "m1",
    sender: "Sarah Jenkins",
    text: "Is the iPad still available? I can meet at the library.",
    time: "2024-03-15T10:30:00Z",
    unread: true,
  },
  {
    id: "m2",
    sender: "Mike Ross",
    text: "I'll take the textbook for $40 if possible.",
    time: "2024-03-14T15:45:00Z",
    unread: false,
  },
];

export default function DashboardPage() {
  const currentUser = useCurrentUser();
  const firstName = currentUser?.displayName?.split(" ")[0] || "Student";
  const greeting = getGreeting();

  return (
    <div className="space-y-lg">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <h1 className="font-bold text-h1 text-on-surface">
            {greeting}, {firstName}
          </h1>
          <p className="text-body text-on-surface-variant">
            Here&apos;s what&apos;s happening with your listings today.
          </p>
        </motion.div>
        
        <motion.div 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible"
          transition={{ delay: 0.1 }}
          className="flex gap-2"
        >
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary-fixed-dim" />
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-secondary-fixed" />
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-tertiary-fixed" />
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-variant flex items-center justify-center text-[10px] font-bold">
              +12
            </div>
          </div>
          <p className="text-caption text-on-surface-variant self-center ml-2">
            Friends active now
          </p>
        </motion.div>
      </section>

      {/* Performance Stats Bento */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {PERFORMANCE_STATS.map((stat) => (
          <motion.div
            key={stat.id}
            variants={fadeInUp}
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 ${stat.iconBg} rounded-lg`}>
                <span className={`material-symbols-outlined ${stat.iconColor}`}>
                  {stat.icon}
                </span>
              </div>
              <span className={`text-caption font-bold ${stat.trendColor}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="font-bold text-h2 text-on-surface">
              {stat.value}
            </h3>
            <p className="text-small text-on-surface-variant">
              {stat.label}
            </p>
            
            {/* Chart visualization */}
            <div className="mt-4 h-12 w-full overflow-hidden rounded-lg relative flex items-end">
              {stat.chart === "line" && (
                <>
                  <div className="absolute inset-0 bg-primary/10 opacity-20" />
                  <svg className="w-full h-full stroke-primary fill-none stroke-2" viewBox="0 0 100 30">
                    <path d="M0,25 Q15,5 30,20 T60,10 T100,22" />
                  </svg>
                </>
              )}
              {stat.chart === "bar" && (
                <div className="flex items-end gap-1 h-full w-full">
                  <div className="bg-secondary/40 w-full h-[40%] rounded-t-sm" />
                  <div className="bg-secondary/40 w-full h-[60%] rounded-t-sm" />
                  <div className="bg-secondary/40 w-full h-[50%] rounded-t-sm" />
                  <div className="bg-secondary w-full h-[90%] rounded-t-sm" />
                  <div className="bg-secondary/40 w-full h-[70%] rounded-t-sm" />
                </div>
              )}
              {stat.chart === "stars" && (
                <div className="flex items-center gap-1 h-full w-full justify-start pb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Main Grid: My Listings + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: My Listings */}
        <motion.section 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden"
        >
          <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
            <h2 className="font-semibold text-title text-on-surface">
              My Listings
            </h2>
            <Link
              href={`${ROUTES.PROFILE}#listings`}
              className="text-small font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          
          <div className="divide-y divide-outline-variant/20">
            {MOCK_LISTINGS.map((listing) => (
              <div key={listing.id} className="p-4 hover:bg-surface-container-low transition-colors flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Image */}
                <div className="w-20 h-20 bg-surface-container-high rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-body text-on-surface truncate">
                      {listing.title}
                    </h4>
                    <span className="font-bold text-body text-on-surface">
                      {formatPrice(listing.price)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-caption text-on-surface-variant mb-2">
                    <span className="px-2 py-0.5 bg-surface-variant rounded-md font-medium">
                      {listing.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-small">visibility</span>
                      {listing.views} views
                    </span>
                  </div>
                  
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${listing.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <span className="text-caption capitalize text-on-surface-variant">
                        {listing.status}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-1.5 text-outline hover:bg-surface-variant rounded-md transition-colors">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="p-1.5 text-outline hover:bg-surface-variant rounded-md transition-colors">
                        <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Right Col: Messages & Saved */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Recent Messages */}
          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden">
            <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center">
              <h2 className="font-semibold text-body text-on-surface">
                Recent Messages
              </h2>
              <Link
                href={ROUTES.CHAT}
                className="text-caption font-medium text-primary hover:underline"
              >
                Inbox
              </Link>
            </div>
            <div className="divide-y divide-outline-variant/20">
              {MOCK_MESSAGES.map((msg) => (
                <div key={msg.id} className="p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-small text-on-surface flex items-center gap-1.5">
                      {msg.sender}
                      {msg.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </span>
                    <span className="text-caption text-on-surface-variant">
                      {formatRelativeTime(msg.time)}
                    </span>
                  </div>
                  <p className="text-caption text-on-surface-variant truncate group-hover:text-on-surface transition-colors">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Saved Items Summary */}
          <section className="bg-gradient-to-br from-primary-fixed to-secondary-fixed rounded-xl p-6 text-on-primary-fixed">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <span className="bg-white/40 backdrop-blur-sm px-2 py-1 rounded-md text-caption font-bold">
                8 Items
              </span>
            </div>
            <h3 className="font-bold text-title mb-1">Saved Listings</h3>
            <p className="text-small opacity-80 mb-4">
              3 items in your wishlist have dropped in price.
            </p>
            <Link
              href={ROUTES.WISHLIST}
              className="inline-flex items-center gap-2 bg-surface-container-lowest text-primary px-4 py-2 rounded-lg font-semibold text-small hover:opacity-90 transition-opacity w-full justify-center"
            >
              View Wishlist
            </Link>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
