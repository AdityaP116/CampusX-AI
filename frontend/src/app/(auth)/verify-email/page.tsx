"use client";

// =========================================================
// Verify Email Page
// Pixel-perfect conversion of design/1/verify_student_email
// =========================================================

import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/store/auth.store";
import { useToast } from "@/store/ui.store";
import { fadeInUp } from "@/lib/motion";
import AuthApi from "@/services/auth.api";

export default function VerifyEmailPage() {
  const router = useRouter();
  const toast = useToast();
  const currentUser = useCurrentUser();
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // If there's no currentUser loaded yet, we'll just show a placeholder email
  // The ProtectedRoute component would normally handle redirecting unauthenticated users.
  const email = currentUser?.email || "student@university.edu";

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input if a digit was entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on Backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    
    if (code.length !== 6) {
      toast.error("Invalid Code", "Please enter the 6-digit code.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Assuming a verification method in AuthApi
      // For now, mock a delay and success
      await new Promise(resolve => setTimeout(resolve, 1500));
      // await AuthApi.verifyEmail(code);
      
      toast.success("Email Verified", "Your student email has been confirmed.");
      router.push(ROUTES.DASHBOARD); // Or ROUTES.UPLOAD_ID depending on the flow
    } catch {
      toast.error("Verification failed", "The code was incorrect or expired.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-margin-mobile relative overflow-hidden">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Main Verification Container */}
      <motion.main 
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[480px] bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-sm p-lg md:p-xl relative overflow-hidden"
      >
        {/* Branding Anchor */}
        <div className="flex justify-center mb-lg">
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <span className="text-primary font-bold text-title tracking-tight">CampusX</span>
          </Link>
        </div>

        {/* Success/Security Icon Cluster */}
        <div className="flex flex-col items-center mb-xl">
          <div className="w-20 h-20 bg-primary-container/10 rounded-full flex items-center justify-center mb-md animate-[float_6s_ease-in-out_infinite]">
            <span className="material-symbols-outlined text-primary text-h1" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
          </div>
          <h1 className="font-bold text-h2 text-center mb-xs text-on-surface">
            Verify your student status
          </h1>
          <p className="text-body text-on-surface-variant text-center px-4">
            We&apos;ve sent a code to <span className="text-on-surface font-semibold">{email}</span>
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="space-y-xl">
          {/* 6-Digit OTP Field */}
          <div className="flex justify-between gap-2 md:gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                aria-label={`Digit ${i + 1}`}
                className="w-12 h-14 md:w-14 md:h-16 text-center font-semibold text-h3 bg-surface-container-low text-on-surface border-none rounded-xl focus:bg-surface focus:ring-2 focus:ring-primary transition-all duration-200"
              />
            ))}
          </div>

          <div className="space-y-md">
            <button 
              type="submit"
              disabled={isSubmitting || otp.join("").length < 6}
              className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold text-title h-[56px] rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:active:scale-100"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </button>

            <div className="flex flex-col items-center gap-base">
              <p className="font-medium text-small text-on-surface-variant">
                Didn&apos;t receive the code?
              </p>
              <button 
                type="button"
                onClick={() => toast.success("Code resent", "Check your inbox in a few moments.")}
                className="text-primary font-semibold text-small hover:underline transition-all duration-200 flex items-center gap-1 group"
              >
                <span className="material-symbols-outlined text-[18px] group-hover:rotate-180 transition-transform duration-500">
                  refresh
                </span>
                Resend code
              </button>
            </div>
          </div>
        </form>

        {/* Security Badge */}
        <div className="mt-xl pt-lg border-t border-outline-variant/20 flex items-center justify-center gap-2 text-on-surface-variant/60">
          <span className="material-symbols-outlined text-body">lock</span>
          <span className="text-caption">Secured student-only ecosystem</span>
        </div>
      </motion.main>

      {/* Footer Links */}
      <footer className="mt-lg flex gap-md z-10 relative">
        <Link href="#" className="font-medium text-small text-on-surface-variant hover:text-primary transition-colors">
          Help Center
        </Link>
        <span className="text-outline-variant/40">•</span>
        <Link href="#" className="font-medium text-small text-on-surface-variant hover:text-primary transition-colors">
          Privacy Policy
        </Link>
      </footer>
    </div>
  );
}
