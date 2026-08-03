import * as React from "react"
import { FadeIn } from "@/shared/components/ui/fade-in"

export default function PrivacyPage() {
  return (
    <div className="bg-surface min-h-screen">
      <main className="max-w-[800px] mx-auto px-6 py-20">
        <FadeIn>
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-4">Privacy Policy</h1>
            <p className="font-body text-lg text-on-surface-variant">Last updated: August 2026</p>
          </div>

          <div className="space-y-12 font-body text-on-surface-variant leading-relaxed">
            <section className="space-y-4">
              <h2 className="font-headline text-2xl font-bold text-on-surface">1. Data We Collect</h2>
              <p>
                We collect your institutional email address for verification purposes, your name, and any data you provide when 
                creating listings or sending messages. We do not sell your personal data to third parties.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-headline text-2xl font-bold text-on-surface">2. How We Use Your Data</h2>
              <p>
                Your information is used strictly to provide and improve the CampusX marketplace experience. This includes 
                account authentication, facilitating communication between users, and maintaining platform security and integrity.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-headline text-2xl font-bold text-on-surface">3. Data Security</h2>
              <p>
                We use enterprise-grade encryption and secure database infrastructure (Firebase) to protect your data. However, 
                no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-headline text-2xl font-bold text-on-surface">4. Your Rights</h2>
              <p>
                You have the right to access, modify, or delete your account and associated data at any time. If you wish to 
                request a full data export or deletion, please contact support.
              </p>
            </section>
          </div>
        </FadeIn>
      </main>
    </div>
  )
}
