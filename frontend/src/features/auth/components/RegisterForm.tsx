"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { registerWithEmail } from "@/features/auth/services/authService"

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid student email address." }).refine(
    (val) => val.includes(".edu") || val.endsWith("@nhitm.ac.in") || val.includes(".ac."),
    { message: "Must be a valid student university email (.edu, .ac.in, etc.)" }
  ),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

type RegisterForm = z.infer<typeof registerSchema>

export function RegisterForm() {
  const router = useRouter()
  const [serverError, setServerError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (values: RegisterForm) => {
    setServerError(null)
    try {
      await registerWithEmail(values.name, values.email, values.password)
      router.push("/marketplace")
    } catch (err: any) {
      const code = err?.code ?? ""
      if (code === "auth/email-already-in-use") {
        setServerError("An account with this email already exists.")
      } else if (code === "auth/invalid-email") {
        setServerError("Please use a valid student email address.")
      } else {
        setServerError(err.message || "Something went wrong. Please try again.")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div className="space-y-2">
        <label className="text-sm font-medium text-on-surface">Full Name</label>
        <Input type="text" placeholder="John Doe" {...register("name")} />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-on-surface">Student Email</label>
        <Input type="email" placeholder="student@university.edu" {...register("email")} />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-on-surface">Password</label>
        <Input type="password" placeholder="••••••••" {...register("password")} />
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
      </div>

      {serverError && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {serverError}
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  )
}
