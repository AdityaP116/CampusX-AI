import * as React from "react"
import { FadeIn } from "@/shared/components/ui/fade-in"

export default function TermsPage() {
  return (
    <div className="bg-surface min-h-screen">
      <main className="max-w-[800px] mx-auto px-6 py-20">
        <FadeIn>
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-4">Terms of Service</h1>
            <p className="font-body text-lg text-on-surface-variant">Last updated: August 2026</p>
          </div>

          <div className="space-y-12 font-body text-on-surface-variant leading-relaxed">
            <section className="space-y-4">
              <h2 className="font-headline text-2xl font-bold text-on-surface">1. Introduction</h2>
              <p>
                Welcome to CampusX. By accessing or using our premium verified marketplace, you agree to be bound by these Terms of Service. 
                Our platform is designed exclusively for verified college and university students to buy, sell, rent, and exchange items safely.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-headline text-2xl font-bold text-on-surface">2. Verification & Eligibility</h2>
              <p>
                To use CampusX, you must be a currently enrolled student at a verified university. You must register using a valid `.edu` 
                or equivalent institutional email address. You are responsible for maintaining the confidentiality of your account credentials.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-headline text-2xl font-bold text-on-surface">3. User Conduct & Listings</h2>
              <p>
                Users agree not to post any items that are illegal, prohibited by university guidelines, or violate our community standards. 
                CampusX reserves the right to remove any listing or suspend accounts that engage in fraudulent or harmful behavior.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-headline text-2xl font-bold text-on-surface">4. Transactions & Liability</h2>
              <p>
                CampusX acts solely as a marketplace connecting buyers and sellers. We do not process payments directly for transactions 
                and are not liable for any disputes, damages, or losses resulting from exchanges between users. Always meet in safe, public 
                campus locations.
              </p>
            </section>
          </div>
        </FadeIn>
      </main>
    </div>
  )
}
