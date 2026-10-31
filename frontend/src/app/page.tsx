import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { 
  BadgeCheck, Search, TrendingUp, BookOpen, MonitorSmartphone, 
  Armchair, Shirt, Dumbbell, MoreHorizontal, Heart, MapPin, 
  IdCard, ListTodo, Handshake, CheckCircle2, ArrowRight
} from "lucide-react"
import { FadeIn } from "@/shared/components/ui/fade-in"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <FadeIn>
      <section className="max-w-[1280px] mx-auto px-6 py-12 md:py-28 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-container/10 text-primary rounded-full">
            <BadgeCheck className="w-5 h-5 text-primary" />
            <span className="font-label text-xs uppercase tracking-wider font-bold">Verified Student Community</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-6xl text-on-surface font-bold leading-tight tracking-tight">
            The premium <br />
            <span className="text-primary">marketplace</span> for <br />
            campus life.
          </h1>
          
          <p className="text-on-surface-variant font-body text-lg max-w-md">
            Buy, sell, and trade with verified students from your university. Trusted, secure, and exclusively for your campus.
          </p>
          
          <form action="/marketplace" method="GET" className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-grow max-w-md">
              <label htmlFor="hero-search" className="sr-only">Search listings</label>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
              <input 
                id="hero-search"
                type="text" 
                name="search"
                placeholder="Search textbooks, tech, furniture..." 
                className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-body text-base"
              />
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto h-[58px] px-8 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
              Explore
            </Button>
          </form>
        </div>
        
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl -z-10 rotate-3"></div>
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-[0px_8px_24px_rgba(0,0,0,0.08)] border border-primary/10 relative group bg-surface-container">
            <Image 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&q=80" 
              alt="Students collaborating and trading textbooks on college campus"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            
            {/* Glass Floating UI Element */}
            <div className="absolute bottom-6 right-6 p-4 bg-white/70 backdrop-blur-md rounded-xl border border-white/50 shadow-xl max-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="font-label text-xs font-bold text-on-surface leading-tight">Live Student Community</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Categories Section */}
      <FadeIn delay={0.1}>
      <section className="bg-surface-container-low py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline text-3xl font-bold text-on-surface">Browse by Category</h2>
              <p className="text-on-surface-variant font-body text-sm mt-2">Everything you need for your university journey</p>
            </div>
            <Link href="/marketplace" className="text-primary font-bold font-body hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: BookOpen, label: "Textbooks", id: "textbooks" },
              { icon: MonitorSmartphone, label: "Electronics", id: "electronics" },
              { icon: Armchair, label: "Furniture", id: "furniture" },
              { icon: Shirt, label: "Clothing", id: "clothing" },
              { icon: Dumbbell, label: "Sports", id: "sports" },
              { icon: MoreHorizontal, label: "Other", id: "other" }
            ].map((cat, i) => (
              <Link 
                key={i} 
                href={`/marketplace?category=${cat.id}`}
                className="flex flex-col items-center p-6 bg-surface rounded-2xl shadow-[0px_1px_2px_rgba(0,0,0,0.05),_0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)] hover:border-primary/10 border border-transparent transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-primary-container/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <cat.icon className="w-8 h-8" />
                </div>
                <span className="font-label text-xs text-on-surface-variant font-bold uppercase tracking-wider">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* How It Works Section */}
      <FadeIn delay={0.1}>
      <section id="how-it-works" className="bg-white py-32 border-y border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-4">Safe. Simple. Student-Only.</h2>
            <p className="text-on-surface-variant text-base md:text-lg">We&apos;ve built CampusX to be the safest way to trade items with your peers, removing the friction and risk of public marketplaces.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto text-primary">
                <IdCard className="w-10 h-10" />
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface">Verify Identity</h3>
              <p className="text-on-surface-variant font-body text-sm">Sign in with your university email. We verify every student to ensure a safe, closed community.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto text-primary">
                <ListTodo className="w-10 h-10" />
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface">List Items</h3>
              <p className="text-on-surface-variant font-body text-sm">Snap a photo, set your price, and post. Your listing is instantly visible to students on campus.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto text-primary">
                <Handshake className="w-10 h-10" />
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface">Safe Exchange</h3>
              <p className="text-on-surface-variant font-body text-sm">Meet at designated safe zones on campus. Chat securely within the app to coordinate.</p>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Statistics Section */}
      <FadeIn delay={0.1}>
      <section className="max-w-[1280px] mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="grid grid-cols-12 gap-6 h-auto lg:h-[400px]">
            <div className="col-span-12 md:col-span-6 lg:col-span-6 row-span-2 p-8 bg-primary-container text-on-primary-container rounded-3xl flex flex-col justify-center space-y-4 shadow-md">
              <div className="text-5xl font-bold font-display tracking-tight">100%</div>
              <div className="font-headline text-xl font-bold">Verified Students</div>
              <p className="text-white/80 font-body text-sm">Exclusively for students with verified university credentials.</p>
            </div>
            <div className="col-span-6 p-6 bg-surface-container-high rounded-3xl flex flex-col justify-center shadow-sm">
              <div className="text-3xl font-display font-bold text-on-surface">4.9/5</div>
              <div className="text-on-surface-variant font-label text-xs uppercase tracking-wider font-bold mt-1">User Trust Score</div>
            </div>
            <div className="col-span-6 p-6 bg-secondary-container rounded-3xl flex flex-col justify-center shadow-sm">
              <div className="text-3xl font-display font-bold text-secondary-fixed-dim">Zero</div>
              <div className="text-on-secondary-container font-label text-xs uppercase tracking-wider font-bold mt-1">Listing Fees</div>
            </div>
          </div>
          <div className="space-y-6 lg:pl-8">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface">Powering the Campus Economy.</h2>
            <p className="text-on-surface-variant text-base md:text-lg">By keeping trades within the campus, we reduce waste, save money, and build a more connected student body. CampusX is more than a store—it&apos;s a sustainable community.</p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="text-on-surface font-body text-base font-medium">Zero listing fees for students</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="text-on-surface font-body text-base font-medium">On-campus designated safe zones</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="text-on-surface font-body text-base font-medium">Real-time messaging between students</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* CTA Section */}
      <FadeIn delay={0.1}>
      <section className="max-w-[1280px] mx-auto px-6 mb-32">
        <div className="relative rounded-3xl overflow-hidden py-24 px-6 text-center space-y-8 bg-[#293040] shadow-lg">
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Ready to clear your dorm?</h2>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-8">Join the exclusive marketplace for your university today. Start listing in less than 2 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button variant="primary" size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-surface active:scale-95 transition-all px-8 py-6 rounded-xl text-lg shadow-sm">
                  Get Started
                </Button>
              </Link>
              <Link href="/safety">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20 active:scale-95 transition-all px-8 py-6 rounded-xl text-lg backdrop-blur-md">
                  Safety Guidelines
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>
    </div>
  )
}
