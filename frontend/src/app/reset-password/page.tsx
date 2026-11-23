"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  confirmPasswordReset, 
  verifyPasswordResetCode, 
  sendPasswordResetEmail 
} from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { AuthLayout } from "@/features/auth/components/AuthLayout"
import { ArrowLeft, CheckCircle2, KeyRound, Mail, AlertCircle } from "lucide-react"

const requestSchema = z.object({
  email: z.string().email("Please enter a valid student email address"),
})

const newPasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type RequestFormValues = z.infer<typeof requestSchema>
type NewPasswordFormValues = z.infer<typeof newPasswordSchema>

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const oobCode = searchParams.get("oobCode") // Firebase email action code

  const [mode, setMode] = React.useState<"request" | "confirm">(oobCode ? "confirm" : "request")
  const [emailForReset, setEmailForReset] = React.useState<string | null>(null)
  const [codeValidating, setCodeValidating] = React.useState(Boolean(oobCode))
  const [codeError, setCodeError] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const requestForm = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
  })

  const newPasswordForm = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
  })

  // Verify Firebase oobCode if present in query params
  React.useEffect(() => {
    if (oobCode) {
      setCodeValidating(true)
      verifyPasswordResetCode(auth, oobCode)
        .then((email) => {
          setEmailForReset(email)
          setMode("confirm")
          setCodeValidating(false)
        })
        .catch((err: unknown) => {
          const errorObj = err as { code?: string; message?: string }
          if (errorObj?.code === "auth/invalid-action-code") {
            setCodeError("This password reset link is invalid or has already been used.")
          } else if (errorObj?.code === "auth/expired-action-code") {
            setCodeError("This password reset link has expired. Please request a new one.")
          } else {
            setCodeError(errorObj?.message || "Invalid password reset link.")
          }
          setCodeValidating(false)
        })
    }
  }, [oobCode])

  const onRequestSubmit = async (values: RequestFormValues) => {
    try {
      setErrorMessage(null)
      setSuccessMessage(null)
      await sendPasswordResetEmail(auth, values.email, {
        url: typeof window !== "undefined" ? `${window.location.origin}/login` : "https://campusx-ai.onrender.com/login",
        handleCodeInApp: false,
      })
      setSuccessMessage(
        `If an account exists for ${values.email}, you will receive a password reset link shortly. Please check your inbox and spam folder.`
      )
      requestForm.reset()
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string }
      if (errorObj?.code === "auth/too-many-requests") {
        setErrorMessage("Too many requests. Please wait a few moments before trying again.")
      } else {
        setErrorMessage(errorObj?.message || "Failed to send reset email. Please try again.")
      }
    }
  }

  const onNewPasswordSubmit = async (values: NewPasswordFormValues) => {
    if (!oobCode) return
    try {
      setErrorMessage(null)
      setSuccessMessage(null)
      await confirmPasswordReset(auth, oobCode, values.newPassword)
      setSuccessMessage("Your password has been successfully reset! Redirecting to login...")
      setTimeout(() => {
        router.push("/login")
      }, 2500)
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string }
      setErrorMessage(errorObj?.message || "Failed to reset password. The link may have expired.")
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <Link
            href="/login"
            className="inline-flex items-center text-xs font-semibold text-primary hover:underline mb-4 gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
          </Link>
          <h1 className="font-headline text-3xl font-bold text-on-surface">
            {mode === "confirm" ? "Set New Password" : "Reset Your Password"}
          </h1>
          <p className="text-on-surface-variant font-body text-sm mt-2">
            {mode === "confirm"
              ? `Enter a new secure password for ${emailForReset || "your CampusX account"}.`
              : "Enter your registered university email address and we'll send you a password reset link."}
          </p>
        </div>

        {codeValidating && (
          <div className="p-4 bg-surface-container rounded-xl text-center text-sm text-on-surface-variant font-body animate-pulse">
            Verifying your password reset link...
          </div>
        )}

        {codeError && (
          <div className="p-4 bg-error-container text-error rounded-xl text-sm font-body border border-error/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{codeError}</p>
              <button
                type="button"
                onClick={() => {
                  setCodeError(null)
                  setMode("request")
                }}
                className="text-xs text-primary font-bold hover:underline mt-2 inline-block"
              >
                Request a new password reset email
              </button>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-error-container text-error rounded-xl text-sm font-body border border-error/20 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-4 bg-primary/10 text-primary rounded-xl text-sm font-body border border-primary/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
            <span>{successMessage}</span>
          </div>
        )}

        {!codeValidating && !codeError && mode === "request" && (
          <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-label text-xs font-bold text-on-surface uppercase tracking-wider block">
                Student Email
              </label>
              <div className="relative">
                <Input
                  {...requestForm.register("email")}
                  placeholder="student@university.edu"
                  className="pl-10 h-12"
                  disabled={requestForm.formState.isSubmitting}
                />
                <Mail className="w-4 h-4 text-outline absolute left-3.5 top-4 pointer-events-none" />
              </div>
              {requestForm.formState.errors.email && (
                <p className="text-xs text-error font-medium">{requestForm.formState.errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={requestForm.formState.isSubmitting}
            >
              {requestForm.formState.isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
            </Button>
          </form>
        )}

        {!codeValidating && !codeError && mode === "confirm" && (
          <form onSubmit={newPasswordForm.handleSubmit(onNewPasswordSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-label text-xs font-bold text-on-surface uppercase tracking-wider block">
                New Password
              </label>
              <div className="relative">
                <Input
                  {...newPasswordForm.register("newPassword")}
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-12"
                  disabled={newPasswordForm.formState.isSubmitting}
                />
                <KeyRound className="w-4 h-4 text-outline absolute left-3.5 top-4 pointer-events-none" />
              </div>
              {newPasswordForm.formState.errors.newPassword && (
                <p className="text-xs text-error font-medium">{newPasswordForm.formState.errors.newPassword.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="font-label text-xs font-bold text-on-surface uppercase tracking-wider block">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  {...newPasswordForm.register("confirmPassword")}
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-12"
                  disabled={newPasswordForm.formState.isSubmitting}
                />
                <KeyRound className="w-4 h-4 text-outline absolute left-3.5 top-4 pointer-events-none" />
              </div>
              {newPasswordForm.formState.errors.confirmPassword && (
                <p className="text-xs text-error font-medium">{newPasswordForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={newPasswordForm.formState.isSubmitting}
            >
              {newPasswordForm.formState.isSubmitting ? "Updating Password..." : "Update Password"}
            </Button>
          </form>
        )}

        <div className="text-center pt-2">
          <p className="text-xs text-on-surface-variant font-body">
            Remembered your password?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default function ResetPasswordPage() {
  return (
    <React.Suspense fallback={<div className="min-h-[400px] flex items-center justify-center">Loading...</div>}>
      <ResetPasswordContent />
    </React.Suspense>
  )
}
