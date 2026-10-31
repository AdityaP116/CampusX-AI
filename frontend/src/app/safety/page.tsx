import * as React from "react"
import { FadeIn } from "@/shared/components/ui/fade-in"
import { Breadcrumbs } from "@/shared/components/ui/breadcrumbs"
import { Shield, MapPin, AlertCircle, Eye } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Student Safety Guidelines | CampusX",
  description: "Learn safe campus meetup protocols, fraud prevention tips, and verified student security standards on CampusX.",
  alternates: {
    canonical: "/safety",
  },
  openGraph: {
    title: "Student Safety Guidelines | CampusX",
    description: "Learn safe campus meetup protocols, fraud prevention tips, and verified student security standards on CampusX.",
    url: "/safety",
  },
}

export default function SafetyPage() {
  return (
    <div className="bg-surface min-h-screen">
      <main className="max-w-[800px] mx-auto px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ label: "Safety Guidelines" }]} />
        <FadeIn>
          <div className="mb-12 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-4">Student Safety First</h1>
            <p className="font-body text-lg text-on-surface-variant max-w-2xl mx-auto">
              CampusX is built on trust and institutional verification. Follow these guidelines to ensure 
              every transaction is safe and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h2 className="font-headline text-xl font-bold text-on-surface mb-2">Meet in Public</h2>
              <p className="text-sm font-body text-on-surface-variant">
                Always arrange to meet in well-lit, public campus locations during daylight hours. 
                Ideal spots include student unions, libraries, or campus coffee shops.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
              <Eye className="w-8 h-8 text-primary mb-4" />
              <h2 className="font-headline text-xl font-bold text-on-surface mb-2">Inspect Items</h2>
              <p className="text-sm font-body text-on-surface-variant">
                Take the time to thoroughly inspect electronics or high-value items before completing 
                the transaction. Don&apos;t feel rushed to hand over payment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
              <AlertCircle className="w-8 h-8 text-primary mb-4" />
              <h2 className="font-headline text-xl font-bold text-on-surface mb-2">Report Suspicious Activity</h2>
              <p className="text-sm font-body text-on-surface-variant">
                If a buyer or seller makes you uncomfortable, or if a listing seems fraudulent, use 
                the report button immediately. Our moderation team reviews all reports.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h2 className="font-headline text-xl font-bold text-on-surface mb-2">Verified Only</h2>
              <p className="text-sm font-body text-on-surface-variant">
                Only trade with users who have a verified badge. Look for the checkmark next to their 
                name confirming university email validation.
              </p>
            </div>
          </div>
        </FadeIn>
      </main>
    </div>
  )
}
