"use client";

// =========================================================
// Signup Page — Pixel-perfect conversion of design/1/signup/code.html
// Firebase Authentication: Google OAuth + Email/Password
// Enforces .edu email validation via Zod
// =========================================================

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
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
import AuthApi from "@/services/auth.api";

// ----- Schema -----
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .email("Please enter a valid email")
    .refine((val) => val.endsWith(".edu"), {
      message: "A .edu university email is required",
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const googleProvider = new GoogleAuthProvider();

export default function SignupPage() {
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Register the user with our backend
      await AuthApi.register({
        uid: userCredential.user.uid,
        email: data.email,
        displayName: data.name,
      });

      toast.success("Account created!", "Welcome to CampusX.");
      router.push(ROUTES.DASHBOARD);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/email-already-in-use") {
        toast.error("Email already in use", "Please log in instead.");
      } else {
        toast.error("Signup failed", "An unexpected error occurred.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      
      const email = userCredential.user.email;
      if (email && !email.endsWith(".edu")) {
        // Technically allow for demo, but warn them
        toast.warning(
          "Non-university email",
          "For full access, please use a .edu address."
        );
      }

      await AuthApi.register({
        uid: userCredential.user.uid,
        email: userCredential.user.email ?? "",
        displayName: userCredential.user.displayName ?? "Student",
        photoURL: userCredential.user.photoURL ?? undefined,
      });

      router.push(ROUTES.DASHBOARD);
    } catch {
      toast.error("Google sign-in failed", "Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-surface overflow-x-hidden">
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

      <main className="w-full max-w-md px-margin-mobile md:px-0 relative z-10 py-xxl">
        {/* Branding */}
        <motion.header
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-xl"
        >
          <h1 className="font-bold text-h1 text-primary mb-xs font-sans">
            CampusX
          </h1>
          <p className="text-body text-on-surface-variant">
            Join the verified student marketplace
          </p>
        </motion.header>

        {/* Glassmorphic card */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-lg md:p-xl"
        >
          {/* Social Signup */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isSubmitting}
            className="w-full flex items-center justify-center gap-md py-md px-lg bg-surface-container-lowest border border-outline-variant rounded-xl text-small font-semibold text-on-surface hover:bg-surface-container transition-all active:scale-[0.98] disabled:opacity-60"
          >
            {isGoogleLoading ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <img
                alt="Google Logo"
                className="w-5 h-5"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ2kP-vHRSf0ZV5aw9tInudy3k2jqsAQKiqlsouebU9kH3tVZhbF0nem-xn7dy1UJ2HG2CzrIVJJyF4gukkm97urKVeN3Q1hI-h6DCZMpx0EAnFdnh_O4xEvib1e2MFAb9x6JkR0NkiaPkl5bVPFZUCz_g9w_qoPVHJFgAwYb-asD_6BsSUwOsbgpdDMp33iUWrx9OJFML0Ow-Qsk0bL_h8CmnV94_jZc2omXvDvm7u2MngtOesf3w90LeTyOn0t8IhqvQIm8RZr2y"
              />
            )}
            Continue with Google
          </button>

          <div className="relative my-xl text-center">
            <hr className="border-outline-variant" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-md text-caption font-bold text-outline">
              OR
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg" noValidate>
            {/* Full Name */}
            <div className="space-y-xs">
              <label
                className="font-medium text-small text-on-surface block px-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <div
                className={`relative flex items-center input-focus-ring rounded-xl bg-surface-container-low transition-all ${errors.name ? "ring-2 ring-error" : ""}`}
              >
                <span
                  className="material-symbols-outlined absolute left-md text-outline"
                  aria-hidden="true"
                >
                  person
                </span>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  className="w-full pl-[48px] pr-md py-md bg-transparent border-none focus:ring-0 text-body placeholder:text-outline-variant text-on-surface"
                />
              </div>
              {errors.name && (
                <p className="text-caption text-error px-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* University Email */}
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
                <span
                  className="material-symbols-outlined absolute left-md text-outline"
                  aria-hidden="true"
                >
                  school
                </span>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  autoComplete="email"
                  className="w-full pl-[48px] pr-md py-md bg-transparent border-none focus:ring-0 text-body placeholder:text-outline-variant text-on-surface"
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
              <label
                className="font-medium text-small text-on-surface block px-1"
                htmlFor="password"
              >
                Password
              </label>
              <div
                className={`relative flex items-center input-focus-ring rounded-xl bg-surface-container-low transition-all ${errors.password ? "ring-2 ring-error" : ""}`}
              >
                <span
                  className="material-symbols-outlined absolute left-md text-outline"
                  aria-hidden="true"
                >
                  lock
                </span>
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full pl-[48px] pr-12 py-md bg-transparent border-none focus:ring-0 text-body placeholder:text-outline-variant text-on-surface"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-md text-outline hover:text-primary transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {errors.password && (
                <p className="text-caption text-error px-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Signup CTA */}
            <button
              type="submit"
              disabled={isSubmitting || isGoogleLoading}
              className="w-full bg-primary text-on-primary font-bold text-body py-md rounded-xl hover:bg-secondary transition-all active:scale-[0.97] shadow-[var(--shadow-primary)] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Disclaimer */}
          <p className="mt-lg text-caption text-on-surface-variant text-center px-md">
            By signing up, you agree to our{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </motion.section>

        {/* Footer Link */}
        <footer className="mt-xl text-center">
          <p className="text-body text-on-surface-variant">
            Already have an account?{" "}
            <Link
              href={ROUTES.LOGIN}
              className="text-primary font-bold hover:text-secondary transition-colors"
            >
              Login
            </Link>
          </p>
        </footer>
      </main>

      {/* Contextual Aesthetic Side Image (Hidden on small screens) */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="fixed left-gutter bottom-gutter hidden lg:block max-w-[280px] p-md glass-card rounded-xl pointer-events-none"
      >
        <div
          className="w-full aspect-[4/5] bg-cover bg-center rounded-lg mb-sm"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCG9QgQcXKMZDZFVOCO4gaTzY5QpFH7WlciUhwsU379aSWvwMFdCCEYBpxzRPtFrWV6Q7zIgw76Z5aeGD3paawa74AogXGZUUjN17RLr3SrOetceG-baNfWszDkpKAV63y8x81gUAxcszs54dC-WY79Tf4Vhk5xs7xAPdQRtjhR8ogObVh7FIM6IfCbfm9cO0C5iFrZgC45v3rJ3xvrIvqSq8gBiQ-cx6rFpkzBgunRGjJHf4sYlSSH3fs4LO2emIwKUYIZGbh1iC-W')",
          }}
          aria-hidden="true"
        />
        <p className="font-semibold text-small text-on-surface">
          Verified listings only.
        </p>
        <p className="text-caption text-outline">
          Join 10k+ students trading safely.
        </p>
      </motion.div>
    </div>
  );
}
