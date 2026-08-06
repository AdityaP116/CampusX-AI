"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { AuthLayout } from "@/features/auth/components/AuthLayout"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { auth } from "@/lib/firebase"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1"

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address").refine(val => val.endsWith("@nhitm.ac.in"), {
    message: "Must be a valid @nhitm.ac.in university email"
  })
})

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits")
})

type EmailFormValues = z.infer<typeof emailSchema>
type OtpFormValues = z.infer<typeof otpSchema>

export default function CompleteRegistrationPage() {
  const router = useRouter()
  const [step, setStep] = React.useState<"email" | "otp">("email")
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  
  const { register: registerEmail, handleSubmit: handleEmailSubmit, formState: { errors: emailErrors, isSubmitting: isSubmittingEmail } } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema)
  })

  const { register: registerOtp, handleSubmit: handleOtpSubmit, formState: { errors: otpErrors, isSubmitting: isSubmittingOtp } } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema)
  })

  const onEmailSubmit = async (data: EmailFormValues) => {
    try {
      setError(null)
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in with Google first.")
      
      const token = await user.getIdToken()
      const res = await fetch(`${BACKEND_URL}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ universityEmail: data.email }),
      })

      const responseData = await res.json()
      if (!res.ok) {
        throw new Error(responseData.message || "Failed to send OTP")
      }

      setEmail(data.email)
      setStep("otp")
    } catch (err: any) {
      setError(err.message || "Failed to send verification email")
    }
  }

  const onOtpSubmit = async (data: OtpFormValues) => {
    try {
      setError(null)
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in with Google first.")
      
      const token = await user.getIdToken()
      const res = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ universityEmail: email, otp: data.otp }),
      })

      const responseData = await res.json()
      if (!res.ok) {
        throw new Error(responseData.message || "Failed to verify OTP")
      }

      // Set cookie and redirect
      document.cookie = "campusx-authed=1; path=/; max-age=2592000; SameSite=Lax"
      router.push("/marketplace")
    } catch (err: any) {
      setError(err.message || "Failed to verify OTP")
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-headline text-3xl font-bold text-on-surface">Verify College Email</h1>
          <p className="text-on-surface-variant font-body mt-2">
            {step === "email" 
              ? "Since you signed in with Google, we need to link and verify your official @nhitm.ac.in email address before activating your account."
              : `We've sent a 6-digit OTP to ${email}. Please enter it below to verify.`}
          </p>
        </div>

        {error && (
          <div className="p-4 text-sm font-medium text-on-error-container bg-error-container rounded-xl">
            {error}
          </div>
        )}

        {step === "email" ? (
          <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="font-label text-sm font-bold text-on-surface uppercase tracking-wider">NHITM Email</label>
              <Input {...registerEmail("email")} type="email" placeholder="student@nhitm.ac.in" className="h-12" />
              {emailErrors.email && <p className="text-xs font-medium text-error">{emailErrors.email.message}</p>}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmittingEmail}>
              {isSubmittingEmail ? "Sending..." : "Send Verification OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit(onOtpSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="font-label text-sm font-bold text-on-surface uppercase tracking-wider">6-Digit OTP</label>
              <Input {...registerOtp("otp")} type="text" placeholder="123456" className="h-12 text-center tracking-widest text-xl font-bold" maxLength={6} />
              {otpErrors.otp && <p className="text-xs font-medium text-error">{otpErrors.otp.message}</p>}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmittingOtp}>
              {isSubmittingOtp ? "Verifying..." : "Verify & Complete Setup"}
            </Button>
            
            <Button type="button" variant="ghost" className="w-full" onClick={() => setStep("email")}>
              Change Email
            </Button>
          </form>
        )}
      </div>
    </AuthLayout>
  )
}
