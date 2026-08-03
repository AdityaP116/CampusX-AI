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
import { registerWithEmail } from "@/features/auth/services/authService"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address").refine(val => val.endsWith(".edu"), {
    message: "Must be a valid .edu university email"
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

        <p className="text-center text-sm text-on-surface-variant font-body pt-6 border-t border-outline-variant/30 mt-8">
          Already have an account? <Link href="/login" className="font-bold text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
