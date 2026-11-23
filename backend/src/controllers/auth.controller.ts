import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { ApiResponse } from "../utils/response.util";
import { ApiError } from "../utils/api-error";
import { UserService } from "../services";
import { EmailService } from "../services/email.service";
import { redisClient } from "../config/redis.config";
import { logger } from "../utils/logger";

// Helper to hash OTP with SHA-256 to ensure no plaintext secrets are stored
const hashOtp = (email: string, otp: string): string => {
  return crypto.createHash("sha256").update(`${email.toLowerCase()}:${otp}`).digest("hex");
};

// In-memory fallback for development/testing when Redis is not available
interface HashedOtpEntry {
  hashedOtp: string;
  expiresAt: number;
  attempts: number;
}
const memoryOtpStore = new Map<string, HashedOtpEntry>();

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
      if (!currentUser) {
        res.status(404).json(ApiResponse.error("User profile not found. Onboarding required.", null));
        return;
      }
      
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
      if (!currentUser) {
        throw ApiError.notFound("User profile not found");
      }
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

      const normalizedEmail = universityEmail.toLowerCase().trim();

      // Enforce 60s cooldown between requests
      const cooldownKey = `otp_cooldown:${normalizedEmail}`;
      if (redisClient) {
        const inCooldown = await redisClient.get(cooldownKey);
        if (inCooldown) {
          throw ApiError.badRequest("Please wait 60 seconds before requesting another verification code");
        }
      }

      // Generate cryptographically secure 6-digit OTP
      const otp = crypto.randomInt(100000, 1000000).toString();
      const hashed = hashOtp(normalizedEmail, otp);

      // Store hashed OTP with 5 minutes (300 seconds) expiration
      if (redisClient) {
        await redisClient.set(`otp:${normalizedEmail}`, hashed, "EX", 300);
        await redisClient.set(cooldownKey, "1", "EX", 60);
        await redisClient.set(`otp_attempts:${normalizedEmail}`, "0", "EX", 300);
      } else {
        memoryOtpStore.set(normalizedEmail, {
          hashedOtp: hashed,
          expiresAt: Date.now() + 300000,
          attempts: 0,
        });
      }

      // Dispatch OTP via EmailService
      await EmailService.sendOtpEmail(normalizedEmail, otp);

      res.status(200).json(ApiResponse.success("Verification OTP sent to university email", null));
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

      const normalizedEmail = universityEmail.toLowerCase().trim();
      const candidateHash = hashOtp(normalizedEmail, otp);

      // Verify OTP with attempt-throttling (max 5 attempts)
      if (redisClient) {
        const attemptsStr = await redisClient.get(`otp_attempts:${normalizedEmail}`);
        const attempts = attemptsStr ? parseInt(attemptsStr, 10) : 0;
        if (attempts >= 5) {
          await redisClient.del(`otp:${normalizedEmail}`);
          throw ApiError.badRequest("Too many failed attempts. Please request a new verification code.");
        }

        const storedHash = await redisClient.get(`otp:${normalizedEmail}`);
        if (!storedHash || storedHash !== candidateHash) {
          await redisClient.incr(`otp_attempts:${normalizedEmail}`);
          throw ApiError.badRequest("Invalid or expired OTP");
        }

        // Single-use: delete immediately upon successful verification
        await redisClient.del(`otp:${normalizedEmail}`);
        await redisClient.del(`otp_attempts:${normalizedEmail}`);
      } else {
        const entry = memoryOtpStore.get(normalizedEmail);
        if (!entry || entry.expiresAt < Date.now()) {
          memoryOtpStore.delete(normalizedEmail);
          throw ApiError.badRequest("Invalid or expired OTP");
        }

        if (entry.attempts >= 5) {
          memoryOtpStore.delete(normalizedEmail);
          throw ApiError.badRequest("Too many failed attempts. Please request a new verification code.");
        }

        if (entry.hashedOtp !== candidateHash) {
          entry.attempts += 1;
          throw ApiError.badRequest("Invalid or expired OTP");
        }

        // Single-use: delete immediately
        memoryOtpStore.delete(normalizedEmail);
      }

      // Link or create student record
      let user;
      try {
        user = await UserService.getUserByUid(uid);
      } catch {
        // User not found, will create below
      }

      if (user) {
        await UserService.updateUser(user.id!, {
          universityEmail: normalizedEmail,
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
          universityEmail: normalizedEmail,
          provider: "google",
        });
      }

      logger.info(`Student ${normalizedEmail} successfully verified and linked to UID ${uid}`);
      res.status(200).json(ApiResponse.success("OTP verified and account linked", user));
    } catch (error) {
      next(error);
    }
  }
}
