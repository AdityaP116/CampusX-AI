import * as React from "react"
import { FadeIn } from "@/shared/components/ui/fade-in"
import { Button } from "@/shared/components/ui/button"
import { Mail, MessageSquare } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="bg-surface min-h-screen">
      <main className="max-w-[800px] mx-auto px-6 py-20">
        <FadeIn>
          <div className="mb-12 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-4">Contact Support</h1>
            <p className="font-body text-lg text-on-surface-variant max-w-2xl mx-auto">
              Need help with a transaction, having account issues, or just want to leave feedback? 
              Our team is here for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.03)] text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface mb-2">Email Support</h3>
              <p className="text-sm font-body text-on-surface-variant mb-6">
                Send us an email anytime. We typically respond within 24 hours during business days.
              </p>
              <Button className="w-full">support@campusx.com</Button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.03)] text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface mb-2">Live Chat</h3>
              <p className="text-sm font-body text-on-surface-variant mb-6">
                Chat directly with a support agent. Available Monday-Friday, 9am - 5pm EST.
              </p>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                Start Chat
              </Button>
            </div>
          </div>
        </FadeIn>
      </main>
    </div>
  )
}
