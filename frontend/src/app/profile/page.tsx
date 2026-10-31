"use client"

import * as React from "react"
import Link from "next/link"
import { BadgeCheck, Star, Truck, Heart, Plus, Package } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent } from "@/shared/components/ui/card"
import { VerifiedBadge } from "@/shared/components/ui/verified-badge"
import { useAuthStore } from "@/features/auth/store/authStore"
import { useQuery } from "@tanstack/react-query"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function ProfilePage() {
  const { user } = useAuthStore()

  const { data: userListings = [], isLoading } = useQuery({
    queryKey: ["my-listings", user?.uid],
    queryFn: async () => {
      if (!user?.uid) return []
      const q = query(collection(db, "products"), where("sellerId", "==", user.uid))
      const snapshot = await getDocs(q)
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any))
    },
    enabled: !!user?.uid,
  })

  const displayName = user?.displayName || "Student"
  const email = user?.email || "student@university.edu"
  const initials = displayName.substring(0, 2).toUpperCase()

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-[1280px]">
      {/* Profile Header Section */}
      <section className="mb-12">
        <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center shadow-sm border border-outline-variant/20">
          {/* Avatar & Identity */}
          <div className="relative shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface-container overflow-hidden bg-primary/10 flex items-center justify-center font-bold text-3xl text-primary">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={displayName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div className="absolute bottom-2 right-2 bg-primary-container p-1 rounded-full border-4 border-white">
              <VerifiedBadge className="w-5 h-5" />
            </div>
          </div>
          
          {/* Info Grid */}
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-headline text-3xl font-bold text-on-surface">{displayName}</h1>
                <Badge variant="default" className="bg-primary/10 text-primary border border-primary/20">Verified Student</Badge>
              </div>
              <p className="text-secondary font-body mt-1">{email}</p>
            </div>
            
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/5 rounded-xl text-primary">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-label text-xs text-secondary uppercase tracking-wider font-bold">Community Trust</p>
                  <p className="font-headline text-xl font-bold text-primary">Verified</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/5 rounded-xl text-primary">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-label text-xs text-secondary uppercase tracking-wider font-bold">Active Listings</p>
                  <p className="font-headline text-xl font-bold text-on-surface">{userListings.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/5 rounded-xl text-primary">
                  <Star className="w-6 h-6 fill-primary" />
                </div>
                <div>
                  <p className="font-label text-xs text-secondary uppercase tracking-wider font-bold">Rating</p>
                  <p className="font-headline text-xl font-bold text-on-surface">5.0/5.0</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-3 shrink-0">
            <Link href="/create">
              <Button size="lg" className="w-full px-8 shadow-sm gap-2">
                <Plus className="w-4 h-4" /> Post New Listing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Listings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-2xl font-bold text-on-surface">Your Listings ({userListings.length})</h2>
            <Link href="/create" className="text-primary font-bold hover:underline font-body text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add Item
            </Link>
          </div>
          
          {isLoading ? (
            <div className="p-12 text-center text-on-surface-variant">Loading your listings...</div>
          ) : userListings.length === 0 ? (
            <div className="p-12 bg-white rounded-2xl border border-outline-variant/30 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-headline text-lg font-bold text-on-surface">No active listings yet</h3>
                <p className="text-sm text-on-surface-variant mt-1">Declutter your room and earn cash from fellow students on campus.</p>
              </div>
              <Link href="/create" className="inline-block">
                <Button variant="primary">Create Your First Listing</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {userListings.map((listing: any) => (
                <Link key={listing.id} href={`/product/${listing.id}`}>
                  <Card className="group cursor-pointer hover:shadow-md transition-shadow">
                    <div className="h-48 relative overflow-hidden rounded-t-2xl bg-surface-container">
                      <img 
                        src={listing.images?.[0] || listing.thumbnailUrl || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80"} 
                        alt={listing.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full font-bold text-primary shadow-sm text-sm">
                        ${listing.price}
                      </span>
                    </div>
                    <CardContent className="p-5 space-y-2 pt-4">
                      <p className="font-label text-xs text-primary uppercase tracking-wider font-bold">
                        {listing.category || listing.categoryId || "Item"}
                      </p>
                      <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        {listing.title}
                      </h3>
                      <p className="text-secondary text-sm line-clamp-2 font-body">
                        {listing.description}
                      </p>
                      <div className="pt-4 mt-2 border-t border-outline-variant/30 flex justify-between items-center text-xs text-on-surface-variant font-label">
                        <span>Status: <strong className="text-primary uppercase">{listing.status || "active"}</strong></span>
                        <span>{listing.meetupLocation || "Campus"}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Peer Reviews & Trust */}
        <div className="space-y-6">
          <h2 className="font-headline text-2xl font-bold text-on-surface">Community Trust</h2>
          <div className="space-y-4">
            <div className="bg-surface-container-lowest rounded-2xl p-6 space-y-4 shadow-sm border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  CX
                </div>
                <div>
                  <p className="font-bold text-on-surface text-sm font-body">Verified Student Account</p>
                  <p className="text-xs text-secondary font-body">CampusX Trust Guarantee</p>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                Your account is confirmed with your official university credentials. All trades on campus are covered by student-to-student verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
