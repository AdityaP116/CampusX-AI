"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { 
  BadgeCheck, Search, TrendingUp, Sparkles, ShieldCheck, 
  MapPin, Star, ArrowRight, CheckCircle2, Users, Building, 
  Repeat, Tag, Clock, ChevronRight, HelpCircle, Heart,
  Flame, Calendar, ExternalLink, ArrowUpRight
} from "lucide-react"
import { FadeIn } from "@/shared/components/ui/fade-in"
import { useAuthStore } from "@/features/auth/store/authStore"
import { useListings } from "@/features/marketplace/hooks/useListings"

// Categories matching reference site
const CATEGORIES = [
  { id: 1, name: "Electronics", icon: "📱", color: "bg-blue-100 hover:bg-blue-200/80 text-blue-900 border-blue-200", query: "electronics" },
  { id: 2, name: "Books", icon: "📖", color: "bg-green-100 hover:bg-green-200/80 text-green-900 border-green-200", query: "books" },
  { id: 3, name: "Furniture", icon: "🛋️", color: "bg-yellow-100 hover:bg-yellow-200/80 text-yellow-900 border-yellow-200", query: "furniture" },
  { id: 4, name: "Clothing", icon: "👕", color: "bg-purple-100 hover:bg-purple-200/80 text-purple-900 border-purple-200", query: "clothing" },
  { id: 5, name: "Services", icon: "🔧", color: "bg-red-100 hover:bg-red-200/80 text-red-900 border-red-200", query: "services" },
  { id: 6, name: "Tickets", icon: "🎟️", color: "bg-indigo-100 hover:bg-indigo-200/80 text-indigo-900 border-indigo-200", query: "tickets" },
  { id: 7, name: "Sports", icon: "🏀", color: "bg-orange-100 hover:bg-orange-200/80 text-orange-900 border-orange-200", query: "sports" },
  { id: 8, name: "Other", icon: "📦", color: "bg-gray-100 hover:bg-gray-200/80 text-gray-900 border-gray-200", query: "other" },
]

// Real student articles & guides (Trending Gists)
const TRENDING_GISTS = [
  {
    id: 1,
    title: "Best Laptop & Study Gadgets Guide for 2025/2026",
    summary: "Essential tech gear every college student needs without breaking the semester budget.",
    category: "Tech Guide",
    author: "Alex Morgan",
    readTime: "6 min read",
    date: "March 2025",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"
  },
  {
    id: 2,
    title: "How to Save up to 80% on College Textbooks",
    summary: "Tips from senior students on course codes, peer-to-peer exchanges, and buyback cycles.",
    category: "Campus Life",
    author: "Elena Rostova",
    readTime: "4 min read",
    date: "Feb 2025",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80"
  },
  {
    id: 3,
    title: "Dorm Essentials Checklist: Move-in & Move-out Made Easy",
    summary: "Sustainable dorm moving guide: buy from graduating seniors and list your items with zero hassle.",
    category: "Dorm Living",
    author: "Jordan Lee",
    readTime: "5 min read",
    date: "Jan 2025",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80"
  }
]

// Testimonials from verified students
const TESTIMONIALS = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Computer Science",
    university: "Tech Campus",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    content: "CampusX helped me find an affordable M2 MacBook right before finals week. The safe-zone exchange at the Student Union was seamless and trusted!",
    rating: 5
  },
  {
    id: 2,
    name: "Emma Wilson",
    role: "Biology Major",
    university: "State College",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    content: "I sold my old organic chemistry textbooks in less than 24 hours! Much better than the university bookstore buyback rates. Zero listing fees are amazing.",
    rating: 5
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Business Administration",
    university: "University of Commerce",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    content: "The platform is incredibly clean and easy to use. Found dorm furniture for half the retail cost and paid upon inspection at our campus pickup hub.",
    rating: 5
  }
]

// Online student activity ticker
const ONLINE_STUDENTS = [
  { id: 1, name: "Sarah M.", school: "Main Campus", lookingFor: "Calculus Textbook", time: "Just now" },
  { id: 2, name: "Devon K.", school: "North Hall", lookingFor: "Monitor / Desk", time: "2m ago" },
  { id: 3, name: "Priya S.", school: "Engineering Complex", lookingFor: "Lab Coat & Goggles", time: "3m ago" },
  { id: 4, name: "Liam O.", school: "Commerce Quad", lookingFor: "iPad & Pencil", time: "5m ago" }
]

export default function Home() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { data: listings = [] } = useListings()

  // State
  const [searchTab, setSearchTab] = React.useState<"products" | "blog">("products")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isAiSearching, setIsAiSearching] = React.useState(false)
  const [gradientShift, setGradientShift] = React.useState(false)

  // Gradient animation effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setGradientShift((prev) => !prev)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    if (searchTab === "products") {
      setIsAiSearching(true)
      setTimeout(() => {
        setIsAiSearching(false)
        router.push(`/marketplace?search=${encodeURIComponent(searchQuery)}`)
      }, 400)
    } else {
      router.push(`/marketplace?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Featured sample items if live listings are few
  const featuredItems = listings.length >= 4 ? listings.slice(0, 4) : [
    {
      id: "demo-1",
      title: "MacBook Pro 14\" M2 - Barely Used",
      price: 899,
      category: "electronics",
      condition: "Like New",
      meetupLocation: "Student Union Hub",
      images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"],
      sellerName: "John Doe",
      sellerRating: 4.9
    },
    {
      id: "demo-2",
      title: "Calculus & Linear Algebra 5th Edition",
      price: 45,
      category: "books",
      condition: "Good",
      meetupLocation: "Science Library",
      images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80"],
      sellerName: "Sarah Smith",
      sellerRating: 4.8
    },
    {
      id: "demo-3",
      title: "Trek Commuter Mountain Bike + Lock",
      price: 180,
      category: "sports",
      condition: "Excellent",
      meetupLocation: "North Dorms",
      images: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80"],
      sellerName: "Marcus C.",
      sellerRating: 5.0
    },
    {
      id: "demo-4",
      title: "Ergonomic Mesh Desk Chair",
      price: 65,
      category: "furniture",
      condition: "Like New",
      meetupLocation: "Central Campus Quad",
      images: ["https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=800&q=80"],
      sellerName: "Emma W.",
      sellerRating: 4.9
    }
  ]

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface">
      {/* 1. HERO SECTION (Dynamic Background, AI Search, Badges & Hero Card) */}
      <section className="relative overflow-hidden rounded-b-[40px] md:rounded-b-[56px] mb-8 border-b border-primary/10">
        {/* Animated Background Gradients */}
        <div 
          className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out ${
            gradientShift 
              ? "bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100" 
              : "bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100"
          }`}
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        <div className="relative z-10 pt-8 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            
            {/* Left Hero Column */}
            <div className="w-full lg:w-7/12 space-y-6">
              {/* Verified Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-600/10 text-blue-700 rounded-full border border-blue-600/20 backdrop-blur-sm">
                <BadgeCheck className="w-4 h-4 text-blue-600" />
                <span className="font-label text-xs uppercase tracking-wider font-bold">
                  Verified Campus Marketplace
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-gray-900 font-extrabold leading-[1.12] tracking-tight">
                Buy & Sell on <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  CampusX
                </span> with Trust.
              </h1>

              {/* Subtitle */}
              <p className="text-gray-600 font-body text-base sm:text-lg max-w-xl leading-relaxed">
                The premier verified marketplace for your university. Trade textbooks, tech, dorm essentials, and campus services safely with fellow students.
              </p>

              {/* Search Tabs: Products vs Guides */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSearchTab("products")}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    searchTab === "products"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white/80 text-gray-600 hover:bg-white"
                  }`}
                >
                  🛍️ Products
                </button>
                <button
                  type="button"
                  onClick={() => setSearchTab("blog")}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    searchTab === "blog"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white/80 text-gray-600 hover:bg-white"
                  }`}
                >
                  💡 Campus Guides
                </button>
              </div>

              {/* AI-Powered Search Input */}
              <div className="w-full max-w-xl">
                <form onSubmit={handleSearch} className="flex rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                  <div className="flex items-center pl-4 text-blue-600">
                    <Sparkles className="w-5 h-5 animate-pulse text-blue-500" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      searchTab === "products" 
                        ? "Search products with AI (course codes, gadgets, textbooks)..." 
                        : "Search student guides, tips & dorm advice..."
                    }
                    className="flex-grow py-3.5 px-3 focus:outline-none text-gray-800 text-sm sm:text-base font-body bg-transparent"
                  />
                  <button
                    type="submit"
                    disabled={isAiSearching}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 font-semibold transition-colors flex items-center gap-1.5 text-sm sm:text-base"
                  >
                    {isAiSearching ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        <span className="hidden sm:inline">Search</span>
                      </>
                    )}
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>AI search understands course abbreviations, professor codes & campus slang.</span>
                </p>
              </div>

              {/* Category Quick Pills */}
              <div className="flex flex-wrap gap-2 pt-1 max-w-xl">
                {CATEGORIES.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/marketplace?category=${cat.query}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-full text-xs font-medium text-gray-700 hover:bg-white hover:text-blue-600 hover:border-blue-300 hover:shadow-xs transition-all"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>

              {/* Main Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <Link href={user ? "/create" : "/login?redirect=/create"}>
                  <Button variant="primary" size="lg" className="w-full sm:w-auto h-[52px] px-7 rounded-xl shadow-md text-base font-semibold flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                    <span>{user ? "Sell Something" : "Login to Sell"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-[52px] px-7 rounded-xl bg-white text-gray-800 border-gray-300 hover:bg-gray-50 shadow-xs text-base font-semibold">
                    Browse Marketplace
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Hero Graphic & Live Stat Badges */}
            <div className="w-full lg:w-5/12">
              <div className="relative">
                {/* Main Card with Image */}
                <div className="relative h-72 sm:h-84 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?w=1200&q=80"
                    alt="Campus students connecting and exchanging textbooks"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-900/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Pay-on-Delivery / Inspection
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-400 text-yellow-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      ⭐ Top Rated
                    </span>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg sm:text-xl font-bold font-headline">
                      Campus Community Market
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                      Connect, trade, and save safely with verified peers.
                    </p>
                  </div>
                </div>

                {/* 3-Column Stats Counter underneath */}
                <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl text-center border border-gray-100 shadow-sm">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600 font-display">500+</div>
                    <div className="text-[11px] text-gray-600 font-medium mt-0.5">Active Listings</div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl text-center border border-gray-100 shadow-sm">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600 font-display">150+</div>
                    <div className="text-[11px] text-gray-600 font-medium mt-0.5">Daily Trades</div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl text-center border border-gray-100 shadow-sm">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600 font-display">50+</div>
                    <div className="text-[11px] text-gray-600 font-medium mt-0.5">Campus Hubs</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE CAMPUS PULSE / ONLINE STUDENTS */}
      <section className="py-4 border-b border-gray-100 bg-white/60">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 -ml-4" />
              <h2 className="text-sm font-bold text-gray-800">Campus Pulse</h2>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                Active Now
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full sm:w-auto">
              {ONLINE_STUDENTS.map((item) => (
                <div key={item.id} className="bg-gray-50 hover:bg-gray-100/80 px-3 py-1.5 rounded-xl border border-gray-200/60 flex items-center gap-2 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {item.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-500 truncate">{item.lookingFor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. BROWSE CATEGORIES (8 Colorful Grid Tiles matching reference) */}
      <FadeIn delay={0.1}>
        <section className="py-14 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-display flex items-center gap-2">
                  <span>🗂️</span> Browse Categories
                </h2>
                <p className="text-gray-600 font-body text-sm mt-1">
                  Discover what students are buying, selling, and requesting across your campus
                </p>
              </div>
              <Link 
                href="/marketplace" 
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/marketplace?category=${cat.query}`}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${cat.color}`}
                >
                  <div className="text-3xl mb-2.5 select-none">{cat.icon}</div>
                  <p className="text-xs sm:text-sm font-bold text-center">{cat.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 4. FEATURED PRODUCTS (With Badges, Safe Pickup Hubs & Seller Ratings) */}
      <FadeIn delay={0.1}>
        <section className="py-14 sm:py-16 bg-gray-50 border-y border-gray-200/60">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-display flex items-center gap-2">
                  <span>🛍️</span> Featured Products
                </h2>
                <p className="text-gray-600 font-body text-sm mt-1">
                  Handpicked campus deals with zero platform fees and verified student sellers
                </p>
              </div>
              <Link 
                href="/marketplace" 
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 transition-colors"
              >
                <span>Browse Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Thumbnail Container */}
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={item.images?.[0] || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                        {item.condition || "Like New"}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-headline font-bold text-gray-900 text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xl font-extrabold text-gray-900 font-display">
                          ${item.price}
                        </span>
                        <div className="flex items-center text-xs text-yellow-500 font-bold gap-1">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span>{item.sellerRating || "4.8"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer: Seller & Pickup Location */}
                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <span className="truncate max-w-[110px] font-medium text-gray-700">
                        {item.sellerName || "Verified Student"}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600 truncate max-w-[130px]">
                        <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                        <span className="truncate">{item.meetupLocation || "Campus Hub"}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 5. CAMPUS HUBS & SAFE EXCHANGES (How It Works + Safe Pickup Points) */}
      <FadeIn delay={0.1}>
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Safe. Simple. Student-Only.
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 font-display">
                How CampusX Protects Your Trades
              </h2>
              <p className="text-gray-600 text-base mt-2">
                We designed safe-zone pickup points and student verification to eliminate the fraud and anxiety of public marketplaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-100 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-md shadow-blue-500/20">
                  <BadgeCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Verified Student IDs</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Only enrolled university students can buy and sell. Every account is verified with university credentials.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-8 rounded-3xl bg-indigo-50/50 border border-indigo-100 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-md shadow-indigo-500/20">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Campus Pickup Hubs</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Meet in high-visibility designated zones: Student Union, University Library, Campus Cafe, or Engineering Commons.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-8 rounded-3xl bg-purple-50/50 border border-purple-100 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-md shadow-purple-500/20">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Inspect Before You Pay</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Always inspect the item in person before completing the transaction. Zero hidden platform cuts for students.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 6. TRENDING GISTS & CAMPUS GUIDES (Student Articles) */}
      <FadeIn delay={0.1}>
        <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-200/60">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-display flex items-center gap-2">
                  <span>🔥</span> Trending Campus Gists
                </h2>
                <p className="text-gray-600 font-body text-sm mt-1">
                  Student guides, tech reviews, and budgeting strategies written by upperclassmen
                </p>
              </div>
              <Link 
                href="/marketplace" 
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 transition-colors"
              >
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TRENDING_GISTS.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-md text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {post.summary}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                      <span>By {post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 7. STUDENT TESTIMONIALS (What Students Say) */}
      <FadeIn delay={0.1}>
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display flex items-center justify-center gap-2">
                <span>🎓</span> What Students Say
              </h2>
              <p className="text-gray-600 text-base mt-2">
                Hear from peers who have saved thousands on textbooks, electronics, and dorm living.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200/80 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic text-sm leading-relaxed mb-6">
                      &ldquo;{t.content}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200/60">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-white shadow-xs"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{t.name}</h4>
                      <p className="text-xs text-gray-500">{t.role} • {t.university}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 8. CAMPUSX IMPACT / METRICS */}
      <FadeIn delay={0.1}>
        <section className="py-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-y border-blue-100">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-3xl font-bold text-gray-900 font-display">
                CampusX Community Impact
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Empowering student budgets and sustainable campus living
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-xs text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">8,500+</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Active Students</p>
              </div>

              <div className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xs text-center">
                <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-3">
                  <Repeat className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">12,000+</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Items Re-used</p>
              </div>

              <div className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-xs text-center">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                  <Building className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">50+</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Campus Hubs</p>
              </div>

              <div className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-100 shadow-xs text-center">
                <div className="w-14 h-14 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center mb-3">
                  <Tag className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">Zero</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Student Listing Fees</p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 9. BOTTOM COMMUNITY CTA BANNER */}
      <FadeIn delay={0.1}>
        <section className="py-16 sm:py-20">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#1e293b] rounded-3xl overflow-hidden shadow-xl text-center py-14 px-6 sm:px-12 relative">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                  Join the CampusX Community
                </h2>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Ready to turn unused course materials and dorm gear into cash? Create your verified student account and start trading in minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-2">
                  <Link href="/register">
                    <Button size="lg" className="w-full sm:w-auto h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-base shadow-sm">
                      Sign Up Free
                    </Button>
                  </Link>
                  <Link href="/safety">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold rounded-xl text-base backdrop-blur-sm">
                      Safety Guidelines
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  )
}
