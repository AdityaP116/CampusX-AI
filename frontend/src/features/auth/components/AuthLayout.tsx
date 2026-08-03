import * as React from "react"
import Link from "next/link"
import { ShieldCheck, Lock } from "lucide-react"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 relative bg-surface-container-low overflow-hidden items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Campus life" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm"></div>
        
        {/* Floating elements from design */}
        <div className="relative z-10 w-full max-w-lg p-12">
          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl flex items-center gap-5 animate-[floating_5s_ease-in-out_infinite]">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <p className="font-bold font-headline text-lg text-on-surface">Verified Community</p>
                <p className="text-sm font-body text-on-surface-variant">Over 10,000 verified students.</p>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl flex items-center gap-5 ml-16 animate-[floating_7s_ease-in-out_infinite_reverse]">
              <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-white shrink-0">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <p className="font-bold font-headline text-lg text-on-surface">Secure Trading</p>
                <p className="text-sm font-body text-on-surface-variant">Safe and secure campus exchanges.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 bg-surface">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="inline-block mb-10 font-display font-bold text-3xl text-primary">
            CampusX
          </Link>
          {children}
        </div>
      </div>
    </div>
  )
}
