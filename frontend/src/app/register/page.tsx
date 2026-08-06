"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { AuthLayout } from "@/features/auth/components/AuthLayout"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { registerWithEmail, loginWithGoogle } from "@/features/auth/services/authService"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address").refine(val => val.endsWith("@nhitm.ac.in"), {
    message: "Must be a valid @nhitm.ac.in university email"
  }),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setError(null)
      await registerWithEmail(data.name, data.email, data.password)
      router.push("/marketplace")
    } catch (err: any) {
      setError(err.message || "Failed to create account")
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setError(null)
      await loginWithGoogle()
      router.push("/marketplace")
    } catch (err: any) {
      if (err.message === "REQUIRES_VERIFICATION") {
        router.push("/register/complete")
      } else {
        setError(err.message || "Failed to sign up with Google")
      }
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-headline text-3xl font-bold text-on-surface">Join CampusX</h1>
          <p className="text-on-surface-variant font-body mt-2">Create an account to join your verified student marketplace.</p>
        </div>

        {error && (
          <div className="p-4 text-sm font-medium text-on-error-container bg-error-container rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="font-label text-sm font-bold text-on-surface uppercase tracking-wider">Full Name</label>
            <Input {...register("name")} type="text" placeholder="Alex Johnson" className="h-12" />
            {errors.name && <p className="text-xs font-medium text-error">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-label text-sm font-bold text-on-surface uppercase tracking-wider">University Email</label>
            <Input {...register("email")} type="email" placeholder="student@university.edu" className="h-12" />
            {errors.email && <p className="text-xs font-medium text-error">{errors.email.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="font-label text-sm font-bold text-on-surface uppercase tracking-wider">Password</label>
            <Input {...register("password")} type="password" placeholder="••••••••" className="h-12" />
            {errors.password && <p className="text-xs font-medium text-error">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/30"></div>
          </div>
          <div className="relative flex justify-center text-sm font-label font-medium uppercase tracking-wider">
            <span className="px-4 bg-surface text-on-surface-variant">Or sign up with</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full bg-white hover:bg-surface-container-low" 
          size="lg"
          onClick={handleGoogleLogin}
          type="button"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </Button>

        <p className="text-center text-sm text-on-surface-variant font-body pt-6 mt-8">
          Already have an account? <Link href="/login" className="font-bold text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
