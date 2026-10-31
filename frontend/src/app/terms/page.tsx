import * as React from "react"
import { FadeIn } from "@/shared/components/ui/fade-in"
import { Breadcrumbs } from "@/shared/components/ui/breadcrumbs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | CampusX",
  description: "Read the CampusX Terms of Service covering verified college student membership, listing conduct, and peer safety policies.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | CampusX",
    description: "Read the CampusX Terms of Service covering verified college student membership, listing conduct, and peer safety policies.",
    url: "/terms",
  },
}

export default function TermsPage() {
  return (
    <div className="bg-surface min-h-screen">
      <main className="max-w-[800px] mx-auto px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ label: "Terms of Service" }]} />
        <FadeIn>
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-3">Terms of Service</h1>
            <p className="font-body text-base text-on-surface-variant">Last updated: October 2026</p>
          </div>

          <div className="space-y-10 font-body text-on-surface-variant leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-headline text-2xl font-bold text-on-surface">1. Introduction</h2>
              <p>
                Welcome to CampusX. By accessing or using our platform, you agree to be bound by these Terms of Service. 
                Our platform is designed exclusively for verified college and university students to buy, sell, rent, and exchange items safely.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-2xl font-bold text-on-surface">2. Verification & Eligibility</h2>
              <p>
                To use CampusX, you must be a currently enrolled student at an accredited university. You must register using a valid approved 
                institutional email address (.edu / .ac.in). You are responsible for maintaining the confidentiality of your account credentials.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-2xl font-bold text-on-surface">3. User Conduct & Prohibited Items</h2>
              <p>
                Users agree not to post any items that are illegal, hazardous, prohibited by university codes of conduct, or that violate academic honor codes. 
                CampusX reserves the right to immediately remove any listing or suspend accounts that engage in fraudulent or harmful behavior.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-2xl font-bold text-on-surface">4. Transactions & Peer Safety</h2>
              <p>
                CampusX connects campus buyers and sellers. All transactions occur locally in-person. Always follow our <a href="/safety" className="text-primary underline">Safety Guidelines</a> by meeting in public on-campus spaces.
              </p>
            </section>
          </div>
        </FadeIn>
      </main>
    </div>
  )
}
