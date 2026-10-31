import * as React from "react"
import { FadeIn } from "@/shared/components/ui/fade-in"
import { Breadcrumbs } from "@/shared/components/ui/breadcrumbs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | CampusX",
  description: "Learn how CampusX protects student privacy, handles institutional email data, and enforces strict data retention standards.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | CampusX",
    description: "Learn how CampusX protects student privacy, handles institutional email data, and enforces strict data retention standards.",
    url: "/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <div className="bg-surface min-h-screen">
      <main className="max-w-[800px] mx-auto px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
        <FadeIn>
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-3">Privacy Policy</h1>
            <p className="font-body text-base text-on-surface-variant">Last updated: October 2026</p>
          </div>

          <div className="space-y-10 font-body text-on-surface-variant leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-headline text-2xl font-bold text-on-surface">1. Data We Collect</h2>
              <p>
                We collect your institutional (.edu / .ac.in) email address exclusively for student status verification, along with your name, 
                and any listing or chat data you generate. We never sell your personal contact info or transaction history to third parties or advertisers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-2xl font-bold text-on-surface">2. How We Use Your Data</h2>
              <p>
                Your information is used strictly to provide and improve the CampusX marketplace experience. This includes 
                account authentication, facilitating communication between users, and maintaining platform security and integrity.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-2xl font-bold text-on-surface">3. Data Security & Encryption</h2>
              <p>
                All data transmission is protected with HTTPS/TLS encryption. Sensitive credentials, verification codes, and tokens 
                are stored with cryptographic hashing and strict row-level security policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-2xl font-bold text-on-surface">4. Student Rights & Account Erasure</h2>
              <p>
                You have the full right to export, update, or completely delete your profile and listings at any time through your account settings or by 
                contacting <a href="/support" className="text-primary underline">support@campusx.market</a>.
              </p>
            </section>
          </div>
        </FadeIn>
      </main>
    </div>
  )
}
