import * as React from "react"
import { FadeIn } from "@/shared/components/ui/fade-in"
import { Search, MessageCircle, CreditCard, UserCircle } from "lucide-react"

export default function HelpCenterPage() {
  return (
    <div className="bg-surface min-h-screen">
      <main className="max-w-[800px] mx-auto px-6 py-20">
        <FadeIn>
          <div className="mb-12 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-4">Help Center</h1>
            <p className="font-body text-lg text-on-surface-variant max-w-2xl mx-auto">
              How can we help you today? Browse our frequently asked questions or select a topic below.
            </p>
          </div>

          <div className="relative max-w-xl mx-auto mb-16">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for articles, guides, or questions..." 
              className="w-full bg-white border border-outline-variant/50 rounded-full py-4 pl-12 pr-6 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body text-on-surface"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 hover:border-primary/30 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <UserCircle className="w-5 h-5" />
                </div>
                <h3 className="font-headline text-lg font-bold text-on-surface">Account & Verification</h3>
              </div>
              <p className="text-sm font-body text-on-surface-variant">
                Learn about .edu verification, changing passwords, and managing your profile.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 hover:border-primary/30 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="font-headline text-lg font-bold text-on-surface">Buying & Selling</h3>
              </div>
              <p className="text-sm font-body text-on-surface-variant">
                Best practices for creating listings, negotiating prices, and meeting up safely.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 hover:border-primary/30 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="font-headline text-lg font-bold text-on-surface">Messaging</h3>
              </div>
              <p className="text-sm font-body text-on-surface-variant">
                Guidelines for communication, reporting abuse, and managing your inbox.
              </p>
            </div>
          </div>
        </FadeIn>
      </main>
    </div>
  )
}
