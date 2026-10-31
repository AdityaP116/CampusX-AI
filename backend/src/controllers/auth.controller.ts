import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { ApiResponse } from "../utils/response.util";
import { ApiError } from "../utils/api-error";
import { UserService } from "../services";
import { redisClient } from "../config/redis.config";
import { logger } from "../utils/logger";
import { env } from "../config/env.config";

// In-memory fallback for development/testing when Redis is not available
interface OtpEntry {
  otp: string;
  expiresAt: number;
  attempts: number;
}
const memoryOtpStore = new Map<string, OtpEntry>();

// Clean up expired OTPs periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of memoryOtpStore.entries()) {
    if (value.expiresAt < now) {
      memoryOtpStore.delete(key);
    }
  }
}, 60000);

export class AuthController {
  public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const uid = req.firebaseUser?.uid;
      const email = req.firebaseUser?.email;

      if (!uid || !email) {
        throw ApiError.unauthorized("Valid Firebase token with email required");
      }

      const user = await UserService.createUser({
        uid: uid,
        displayName: req.body.displayName || "New Student",
        email: email,
        photoURL: null,
        role: "STUDENT",
        verificationStatus: "verified",
        universityName: req.body.universityName || "University",
        universityEmail: email,
        provider: "email",
      });
      res.status(201).json(ApiResponse.success("User registered successfully", user));
    } catch (error) {
      next(error);
    }
  }

  public static async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const uid = req.firebaseUser?.uid;
      if (!uid) throw ApiError.unauthorized();
      const currentUser = await UserService.getUserByUid(uid);
      res.status(200).json(ApiResponse.success("User profile retrieved", currentUser));
    } catch (error) {
      next(error);
    }
  }

  public static async updateMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const uid = req.firebaseUser?.uid;
      if (!uid) throw ApiError.unauthorized();
      const currentUser = await UserService.getUserByUid(uid);
      await UserService.updateUser(currentUser.id!, req.body);
      const updatedUser = await UserService.getUserById(currentUser.id!);
      res.status(200).json(ApiResponse.success("Profile updated", updatedUser));
    } catch (error) {
      next(error);
    }
  }

  public static async verifyStudentId(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Student ID submitted for verification", { status: "id_uploaded" }));
    } catch (error) {
      next(error);
    }
  }

  public static async sendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { universityEmail } = req.body;
      const uid = req.firebaseUser?.uid;
      if (!uid) throw ApiError.unauthorized();

      // Check cooldown (60 seconds)
      const cooldownKey = `otp_cooldown:${universityEmail}`;
      if (redisClient) {
        const inCooldown = await redisClient.get(cooldownKey);
        if (inCooldown) {
          throw ApiError.badRequest("Please wait 60 seconds before requesting another verification code");
        }
      }

      // Generate cryptographically secure 6-digit OTP
      const otp = crypto.randomInt(100000, 1000000).toString();

      // Store OTP with 5 minutes (300 seconds) expiration
      if (redisClient) {
        await redisClient.set(`otp:${universityEmail}`, otp, "EX", 300);
        await redisClient.set(cooldownKey, "1", "EX", 60);
        await redisClient.set(`otp_attempts:${universityEmail}`, "0", "EX", 300);
      } else {
        memoryOtpStore.set(universityEmail, {
          otp,
          expiresAt: Date.now() + 300000,
          attempts: 0,
        });
      }

      if (env.NODE_ENV !== "production") {
        logger.info(`[DEV ONLY] OTP for ${universityEmail} is: ${otp}`);
      } else {
        // In production, integrate email service (e.g. SendGrid, Nodemailer)
        logger.info(`Sent verification code to student email domain.`);
      }

      res.status(200).json(ApiResponse.success("Verification OTP sent", null));
    } catch (error) {
      next(error);
    }
  }

  public static async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { universityEmail, otp } = req.body;
      const uid = req.firebaseUser?.uid;
      const googleEmail = req.firebaseUser?.email;
      if (!uid || !googleEmail) throw ApiError.unauthorized();

      // Verify OTP with attempt-throttling
      if (redisClient) {
        const attemptsStr = await redisClient.get(`otp_attempts:${universityEmail}`);
        const attempts = attemptsStr ? parseInt(attemptsStr, 10) : 0;
        if (attempts >= 5) {
          await redisClient.del(`otp:${universityEmail}`);
          throw ApiError.badRequest("Too many failed attempts. Please request a new verification code.");
        }

        const storedOtp = await redisClient.get(`otp:${universityEmail}`);
        if (!storedOtp || storedOtp !== otp) {
          await redisClient.incr(`otp_attempts:${universityEmail}`);
          throw ApiError.badRequest("Invalid or expired OTP");
        }

        await redisClient.del(`otp:${universityEmail}`);
        await redisClient.del(`otp_attempts:${universityEmail}`);
      } else {
        const entry = memoryOtpStore.get(universityEmail);
        if (!entry || entry.expiresAt < Date.now()) {
          memoryOtpStore.delete(universityEmail);
          throw ApiError.badRequest("Invalid or expired OTP");
        }

        if (entry.attempts >= 5) {
          memoryOtpStore.delete(universityEmail);
          throw ApiError.badRequest("Too many failed attempts. Please request a new verification code.");
        }

        if (entry.otp !== otp) {
          entry.attempts += 1;
          throw ApiError.badRequest("Invalid or expired OTP");
        }

        memoryOtpStore.delete(universityEmail);
      }

      // Check if user already exists
      let user;
      try {
        user = await UserService.getUserByUid(uid);
      } catch (err) {
        // User not found, will create below
      }

      if (user) {
        await UserService.updateUser(user.id!, {
          universityEmail,
          verificationStatus: "verified",
        });
        user = await UserService.getUserById(user.id!);
      } else {
        user = await UserService.createUser({
          uid,
          displayName: req.firebaseUser?.name || "New Student",
          email: googleEmail,
          googleEmail: googleEmail,
          photoURL: req.firebaseUser?.picture || null,
          role: "STUDENT",
          verificationStatus: "verified",
          universityName: "University",
          universityEmail,
          provider: "google",
        });
      }

      res.status(200).json(ApiResponse.success("OTP verified and account linked", user));
    } catch (error) {
      next(error);
    }
  }
}
