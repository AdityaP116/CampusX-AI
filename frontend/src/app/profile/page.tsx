"use client"

import * as React from "react"
import { BadgeCheck, Star, Truck, Heart } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent } from "@/shared/components/ui/card"
import { VerifiedBadge } from "@/shared/components/ui/verified-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-[1280px]">
      {/* Profile Header Section */}
      <section className="mb-12">
        <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center shadow-sm border border-outline-variant/20">
          {/* Avatar & Identity */}
          <div className="relative shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface-container overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQuRStORbaqbkfs4z7uaTkayabmZXBwSIJBG_cIHo4aEpt8vNzQJwQBGvSSP5177kfs0IwRT_hNWdIVIR0Onr_OvWV_2InVkpC8ZExrhl8dJ7ZbbSZ-9q44kEVDxrBM5JAvBkz_EpWaY3ajjIB_wkIloT_pO9WJQPRARVH3LM6DnG88iDHNfo6fTueKhCW1G5k-LXGtcZFckOfgxjaWroo5eVKPXezQmhf4P_R0bClTBajgObUFPwe" 
                alt="Sarah Jenkins" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-2 right-2 bg-primary-container p-1 rounded-full border-4 border-white">
              <VerifiedBadge className="w-5 h-5" />
            </div>
          </div>
          
          {/* Info Grid */}
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-headline text-3xl font-bold text-on-surface">Sarah Jenkins</h1>
                <Badge variant="default" className="bg-primary/10 text-primary border border-primary/20">Verified Student</Badge>
              </div>
              <p className="text-secondary font-body mt-1">Senior at Stanford University • Class of 2024</p>
            </div>
            
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/5 rounded-xl text-primary">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-label text-xs text-secondary uppercase tracking-wider font-bold">Trust Score</p>
                  <p className="font-headline text-xl font-bold text-primary">98/100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/5 rounded-xl text-primary">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-label text-xs text-secondary uppercase tracking-wider font-bold">Successful Trades</p>
                  <p className="font-headline text-xl font-bold text-on-surface">42</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/5 rounded-xl text-primary">
                  <Star className="w-6 h-6 fill-primary" />
                </div>
                <div>
                  <p className="font-label text-xs text-secondary uppercase tracking-wider font-bold">Rating</p>
                  <p className="font-headline text-xl font-bold text-on-surface">4.9/5.0</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-3 shrink-0">
            <Button size="lg" className="w-full px-8 shadow-sm">
              Contact Sarah
            </Button>
            <Button variant="secondary" size="lg" className="w-full">
              Report Profile
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Listings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-2xl font-bold text-on-surface">Active Listings</h2>
            <button className="text-primary font-bold hover:underline font-body text-sm">View All</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Listing Item 1 */}
            <Card className="group cursor-pointer">
              <div className="h-48 relative overflow-hidden rounded-t-2xl">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_Ox0zhmkKv7f39wLLRKSTO2x3W8HP1vqwHMtWNls9uZ9lZBHaA75BM9uXy5GwUIfXnsWGviaR4NJ6S324RYZJyf-qMO0K1hA_5UUr13cIgt9gzJQgo5K9Z2gW9I_CaKp1FZfULpHAbMaOQE6zGGB4vvXJRzOMPJnHzfK6-ywbx2ZjghJ6J6f3nvPlW1eCZbe8h1RiXimAxMiL9Dfbs3UuWpuolL7FL7AZwg41N6YluM8bF0BugZjJ" 
                  alt="iPad" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full font-bold text-primary shadow-sm text-sm">$450</span>
              </div>
              <CardContent className="p-5 space-y-2 pt-4">
                <p className="font-label text-xs text-primary uppercase tracking-wider font-bold">Electronics</p>
                <h3 className="font-headline text-lg font-bold text-on-surface">iPad Pro 11" (2nd Gen)</h3>
                <p className="text-secondary text-sm line-clamp-2 font-body">Perfect condition, used for one semester. Includes Apple Pencil and smart cover.</p>
                <div className="pt-4 mt-2 border-t border-outline-variant/30 flex justify-between items-center">
                  <span className="text-sm text-secondary font-body">Posted 2 days ago</span>
                  <Heart className="w-5 h-5 text-secondary hover:text-error transition-colors" />
                </div>
              </CardContent>
            </Card>

            {/* Listing Item 2 */}
            <Card className="group cursor-pointer">
              <div className="h-48 relative overflow-hidden rounded-t-2xl">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzLqjMOVH4UztLHTj-IE7PptHEf1F9MZDV5zx_B9IynJU2D3zkKokraTn91vH11kM2vSwoT-lpO4iiuqnA1u7v4dThou1s-6rpOUeriBjSabD9ZF82x7SlaoiRVNFL5XVx1hyhVQa4k078iIayC7RvYOuh4vc9M54fGvTcUOE8_in_iTCmRwBJvNJZYhkGdfMVNqjQEkN6HIxNTfPmKri8CAVyX-KB-jaHKLfgP0Slud9ba_zMykeG" 
                  alt="Books" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full font-bold text-primary shadow-sm text-sm">$85</span>
              </div>
              <CardContent className="p-5 space-y-2 pt-4">
                <p className="font-label text-xs text-primary uppercase tracking-wider font-bold">Books</p>
                <h3 className="font-headline text-lg font-bold text-on-surface">Organic Chemistry Bundle</h3>
                <p className="text-secondary text-sm line-clamp-2 font-body">Hardcover 12th Edition textbook + Study Guide. No highlights or markings.</p>
                <div className="pt-4 mt-2 border-t border-outline-variant/30 flex justify-between items-center">
                  <span className="text-sm text-secondary font-body">Posted 5 hours ago</span>
                  <Heart className="w-5 h-5 text-secondary hover:text-error transition-colors" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column: Reviews & Trust */}
        <div className="space-y-6">
          <h2 className="font-headline text-2xl font-bold text-on-surface">Reviews from Peers</h2>
          <div className="space-y-4">
            {/* Review 1 */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 space-y-4 shadow-sm border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuAURa9MJZfOC9xhRVCrJTX7nFNlPT1wdIDD8kgh_ES4iRL_iJoQ3QlMD-iy02dYGwfh4NTtSKJq9GzyDU1U_WmFkz1qZJk2BGidLnFVKdcNU5gn1EBKPGqg2qe-dPq3ljdHlf19zqsp2PrNj7yw45EzOwRB5Wfte-5MOr4vl4LYqSczwbWARmTT39nMCCIZpzZx00T_8up8jT74kbgzRIsJ2suKXezsaaIVApC-u9oSTH-v-wJf1Uf3" />
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-on-surface text-sm font-body">Marcus T.</p>
                    <p className="text-xs text-secondary font-body">Verified Buyer</p>
                  </div>
                </div>
                <div className="flex text-primary gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary" />)}
                </div>
              </div>
              <p className="text-sm text-on-surface-variant font-body">"Sarah was great to deal with. The iPad was exactly as described and she met me right on campus. Super trustworthy!"</p>
              <p className="text-xs text-secondary font-body">Oct 12, 2023</p>
            </div>

            {/* Review 2 */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 space-y-4 shadow-sm border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKOZiauV5LddWeiaSlvkTnhdid7zPFJEQi9zgPv9-wGca3nRIUBJDH2CxiWrhmkB8F3fyQTrRqIedWJmMYEVFR5c8SJMEaE74slpbPK2Pw0SGternGbQR9-vpN90B27NBSou1tGfAIeJmzOIoLndhGQ4nAIt7QdOPr2lwDgyXdsQWFozbqvW7_6dXRIyz9CAntRcYA8Khc0EKDTjQ0nmoFlniUuSf3xuzReIDHfHJGslskTwq8Actg" />
                    <AvatarFallback>LK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-on-surface text-sm font-body">Leila K.</p>
                    <p className="text-xs text-secondary font-body">Verified Seller</p>
                  </div>
                </div>
                <div className="flex text-primary gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary" />)}
                </div>
              </div>
              <p className="text-sm text-on-surface-variant font-body">"Sold my old lab coat to her. Quick payment and very polite communication. Highly recommend trading with Sarah."</p>
              <p className="text-xs text-secondary font-body">Sept 28, 2023</p>
            </div>

            <Button variant="outline" className="w-full bg-transparent border-dashed border-primary/30 text-primary hover:bg-primary/5" size="lg">
              View All 42 Reviews
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
