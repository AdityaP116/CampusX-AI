import { z } from "zod";
import { env } from "../config/env.config";

const allowedDomains = (env.ALLOWED_EMAIL_DOMAINS || "nhitm.ac.in,edu")
  .split(",")
  .map((d) => d.trim().toLowerCase());

export const isValidUniversityEmail = (email: string): boolean => {
  const parts = email.toLowerCase().split("@");
  if (parts.length !== 2) return false;
  const domain = parts[1]!;
  return allowedDomains.some((d) => domain === d || domain.endsWith(`.${d}`));
};

const universityEmailSchema = z
  .string()
  .email("Invalid university email format")
  .refine(
    (email) => isValidUniversityEmail(email),
    {
      message: `Must be a valid university email (supported domains: ${allowedDomains.join(", ")})`,
    }
  );

export const authValidators = {
  register: z.object({
    body: z.object({
      displayName: z.string().min(2, "Name must be at least 2 characters").max(50),
      email: universityEmailSchema,
      universityName: z.string().min(2, "University name is required"),
    }),
  }),
  updateProfile: z.object({
    body: z.object({
      displayName: z.string().min(2).max(50).optional(),
      photoURL: z.string().url().optional().nullable(),
    }),
  }),
  sendOtp: z.object({
    body: z.object({
      universityEmail: universityEmailSchema,
    }),
  }),
  verifyOtp: z.object({
    body: z.object({
      universityEmail: universityEmailSchema,
      otp: z.string().length(6, "OTP must be exactly 6 digits"),
    }),
  }),
};

export const productValidators = {
  create: z.object({
    body: z.object({
      title: z.string().min(3, "Title must be at least 3 characters").max(100),
      description: z.string().min(10, "Description must be at least 10 characters").max(2000),
      price: z.coerce.number().min(0, "Price cannot be negative"),
      transactionType: z
        .enum(["SELL", "RENT", "EXCHANGE", "FREE"])
        .or(z.enum(["sell", "rent", "exchange", "free"]).transform((v) => v.toUpperCase() as "SELL" | "RENT" | "EXCHANGE"))
        .optional()
        .default("SELL"),
      condition: z
        .enum(["new", "like_new", "good", "fair", "poor", "like-new"])
        .transform((c) => (c === "like-new" ? "like_new" : c)),
      categoryId: z.string().optional(),
      category: z.string().optional(),
      images: z.array(z.string().url()).default([]),
      thumbnailUrl: z.string().url().optional(),
      location: z.string().optional(),
      meetupLocation: z.string().optional(),
      campusName: z.string().optional().default("Main Campus"),
      tags: z.array(z.string()).default([]),
      negotiable: z.boolean().optional().default(false),
    }),
  }),
  update: z.object({
    params: z.object({
      id: z.string(),
    }),
    body: z.object({
      title: z.string().min(3).max(100).optional(),
      description: z.string().min(10).max(2000).optional(),
      price: z.coerce.number().min(0).optional(),
      status: z.enum(["active", "sold", "hidden", "archived"]).transform((s) => (s === "archived" ? "hidden" : s)).optional(),
      images: z.array(z.string().url()).optional(),
      condition: z.enum(["new", "like_new", "good", "fair", "poor", "like-new"]).transform((c) => (c === "like-new" ? "like_new" : c)).optional(),
    }),
  }),
};

export const chatValidators = {
  sendMessage: z.object({
    params: z.object({
      id: z.string(),
    }),
    body: z.object({
      content: z.string().min(1).max(2000),
    }),
  }),
};
