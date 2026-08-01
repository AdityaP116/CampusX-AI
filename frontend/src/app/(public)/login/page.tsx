"use client";

// =========================================================
// Login Page — Pixel-perfect conversion of design/1/login_1 + google_login
// Firebase Authentication: Google OAuth + Email/Password
// =========================================================

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { auth } from "@/config/firebase.config";
import { ROUTES } from "@/constants/routes";
import { useToast } from "@/store/ui.store";
import { fadeInUp } from "@/lib/motion";
import type { Metadata } from "next";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

// ----- Schema -----
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const googleProvider = new GoogleAuthProvider();

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push(ROUTES.DASHBOARD);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/wrong-password" || code === "auth/user-not-found") {
        toast.error("Invalid credentials", "Please check your email and password.");
      } else if (code === "auth/too-many-requests") {
        toast.error("Too many attempts", "Please wait a moment and try again.");
      } else {
        toast.error("Login failed", "An unexpected error occurred.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push(ROUTES.DASHBOARD);
    } catch {
      toast.error("Google sign-in failed", "Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-surface px-margin-mobile py-xxl overflow-hidden">
      {/* Atmospheric background blobs */}
      <div
        className="floating-blob bg-primary w-[500px] h-[500px] -top-48 -left-24"
        aria-hidden="true"
      />
      <div
        className="floating-blob bg-secondary w-full max-w-md h-[400px] -bottom-24 -right-12"
        aria-hidden="true"
      />
      <div
        className="floating-blob bg-tertiary-fixed w-[300px] h-[300px] top-1/2 left-1/4"
        aria-hidden="true"
      />

      <main className="w-full max-w-md relative z-10">
        {/* Branding */}
        <motion.header
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-xl"
        >
          <Link
            href={ROUTES.HOME}
            className="inline-block font-bold text-primary text-display mb-1"
            aria-label="CampusX home"
          >
            CampusX
          </Link>
          <p className="text-body text-on-surface-variant">
            Sign in to your campus marketplace
          </p>
        </motion.header>

        {/* Glassmorphic card */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="glass-card border border-white/40 rounded-2xl p-lg md:p-xl shadow-[var(--shadow-floating)] space-y-xl"
          aria-label="Sign in form"
        >
          {/* Google OAuth */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isSubmitting}
            className="w-full flex items-center justify-center gap-md py-md px-lg bg-surface-container-lowest border border-outline-variant rounded-xl text-small font-semibold text-on-surface hover:bg-surface-container active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {isGoogleLoading ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              /* Google SVG logo */
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative my-xl text-center">
            <hr className="border-outline-variant" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-md text-caption text-outline">
              OR
            </span>
          </div>

          {/* Email / Password form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg" noValidate>
            {/* Email */}
            <div className="space-y-xs">
              <label
                className="font-medium text-small text-on-surface block px-1"
                htmlFor="email"
              >
                University Email
              </label>
              <div
                className={`relative flex items-center input-focus-ring rounded-xl bg-surface-container-low transition-all ${errors.email ? "ring-2 ring-error" : ""}`}
              >
                <Mail className="absolute left-md text-outline w-5 h-5 pointer-events-none" aria-hidden="true" />
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  autoComplete="email"
                  className="w-full pl-[48px] pr-md py-md bg-transparent border-none focus:ring-0 text-body text-on-surface placeholder:text-outline-variant"
                />
              </div>
              {errors.email && (
                <p className="text-caption text-error px-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-xs">
              <div className="flex items-center justify-between px-1">
                <label
                  className="font-medium text-small text-on-surface"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href={ROUTES.FORGOT_PASSWORD}
                  className="text-caption text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div
                className={`relative flex items-center input-focus-ring rounded-xl bg-surface-container-low transition-all ${errors.password ? "ring-2 ring-error" : ""}`}
              >
                <Lock className="absolute left-md text-outline w-5 h-5 pointer-events-none" aria-hidden="true" />
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-[48px] pr-12 py-md bg-transparent border-none focus:ring-0 text-body text-on-surface placeholder:text-outline-variant"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-md text-outline hover:text-primary transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Eye className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-caption text-error px-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || isGoogleLoading}
              className="w-full bg-primary text-on-primary font-bold text-body py-md rounded-xl hover:bg-secondary active:scale-[0.97] transition-all shadow-[var(--shadow-primary)] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-caption text-center text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link
              href={ROUTES.SIGNUP}
              className="text-primary font-bold hover:text-secondary transition-colors"
            >
              Create account
            </Link>
          </p>
        </motion.section>

        {/* Footer links */}
        <footer className="mt-xl flex justify-center gap-xl text-on-surface-variant/60 text-caption">
          <Link href="#" className="hover:text-primary transition-colors">
            Help
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Terms
          </Link>
        </footer>
      </main>
    </div>
  );
}
