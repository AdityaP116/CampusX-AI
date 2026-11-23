"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { AuthLayout } from "@/features/auth/components/AuthLayout"
import { auth } from "@/lib/firebase"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://campusx-api-zuks.onrender.com/api/v1"

const emailSchema = z.object({
  email: z.string().email("Invalid email").refine(
    (e) => e.endsWith(".edu") || e.endsWith(".ac.in") || e.endsWith("nhitm.ac.in"),
    "Must be a valid student email (.edu or approved university domain)"
  )
})

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
})

type EmailFormValues = z.infer<typeof emailSchema>
type OtpFormValues = z.infer<typeof otpSchema>

function setAuthCookies(token: string) {
  if (typeof window === "undefined") return
  const isSecure = window.location.protocol === "https:"
  const secureFlag = isSecure ? "; Secure" : ""
  window.document.cookie = `campusx-token=${encodeURIComponent(token)}; path=/; max-age=2592000; SameSite=Lax${secureFlag}`
  window.document.cookie = `campusx-authed=1; path=/; max-age=2592000; SameSite=Lax${secureFlag}`
}

export default function CompleteRegistrationPage() {
  const router = useRouter()
  const [step, setStep] = React.useState<"email" | "otp">("email")
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema)
  })

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema)
  })

  const onEmailSubmit = async (data: EmailFormValues) => {
    try {
      setError(null)
      const user = auth.currentUser
      if (!user) throw new Error("No authenticated session found. Please sign in again.")

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
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to send verification email")
    }
  }

  const onOtpSubmit = async (data: OtpFormValues) => {
    try {
      setError(null)
      const user = auth.currentUser
      if (!user) throw new Error("No authenticated session found. Please sign in again.")

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

      setAuthCookies(token)
      router.push("/marketplace")
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to verify OTP")
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-headline text-3xl font-bold text-on-surface">Verify College Email</h1>
          <p className="text-on-surface-variant font-body mt-2">
            {step === "email" 
              ? "Since you signed in with Google, we need to link and verify your official university email address before activating your account."
              : `We've sent a 6-digit OTP to ${email}. Please enter it below to verify.`}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-error-container text-error rounded-xl text-sm font-body border border-error/20">
            {error}
          </div>
        )}

        {step === "email" ? (
          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-label font-bold text-on-surface uppercase tracking-wider block mb-2">University Email</label>
              <Input
                {...emailForm.register("email")}
                placeholder="yourname@college.edu"
                className="w-full"
              />
              {emailForm.formState.errors.email && (
                <p className="text-error text-xs mt-1 font-body">{emailForm.formState.errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={emailForm.formState.isSubmitting}
            >
              {emailForm.formState.isSubmitting ? "Sending OTP..." : "Send Verification Code"}
            </Button>
          </form>
        ) : (
          <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-label font-bold text-on-surface uppercase tracking-wider block mb-2">6-Digit Code</label>
              <Input
                {...otpForm.register("otp")}
                placeholder="123456"
                maxLength={6}
                className="w-full text-center tracking-widest text-lg font-mono"
              />
              {otpForm.formState.errors.otp && (
                <p className="text-error text-xs mt-1 font-body">{otpForm.formState.errors.otp.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={otpForm.formState.isSubmitting}
            >
              {otpForm.formState.isSubmitting ? "Verifying..." : "Verify & Complete Setup"}
            </Button>

            <button
              type="button"
              onClick={() => setStep("email")}
              className="text-xs text-primary font-bold hover:underline block text-center w-full mt-2"
            >
              Change Email Address
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  )
}
