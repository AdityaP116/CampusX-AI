import { z } from "zod";

export const authValidators = {
  register: z.object({
    body: z.object({
      displayName: z.string().min(2, "Name must be at least 2 characters").max(50),
      email: z.string().email("Invalid university email").endsWith("@nhitm.ac.in", "Must be an @nhitm.ac.in email address"),
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
      universityEmail: z.string().email("Invalid university email").endsWith("@nhitm.ac.in", "Must be an @nhitm.ac.in email address"),
    }),
  }),
  verifyOtp: z.object({
    body: z.object({
      universityEmail: z.string().email("Invalid university email").endsWith("@nhitm.ac.in", "Must be an @nhitm.ac.in email address"),
      otp: z.string().length(6, "OTP must be exactly 6 digits"),
    }),
  }),
};

export const productValidators = {
  create: z.object({
    body: z.object({
      title: z.string().min(5).max(100),
      description: z.string().min(10).max(1000),
      price: z.number().positive(),
      transactionType: z.enum(["SELL", "RENT", "EXCHANGE"]),
      condition: z.enum(["new", "like_new", "good", "fair", "poor"]),
      categoryId: z.string().min(1),
      images: z.array(z.string().url()).min(1),
      thumbnailUrl: z.string().url(),
      location: z.string().min(3),
      campusName: z.string().min(3),
      tags: z.array(z.string()),
    }),
  }),
  update: z.object({
    params: z.object({
      id: z.string(),
    }),
    body: z.object({
      title: z.string().min(5).max(100).optional(),
      price: z.number().positive().optional(),
      status: z.enum(["active", "sold", "hidden"]).optional(),
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
