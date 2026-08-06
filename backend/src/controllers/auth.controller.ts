import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response.util";
import { ApiError } from "../utils/api-error";
import { UserService } from "../services";
import { redisClient } from "../config/redis.config";

export class AuthController {
  public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const uid = req.firebaseUser?.uid;
      const email = req.firebaseUser?.email;
      
      if (!uid || !email) {
        throw ApiError.unauthorized("Valid Firebase token with email required");
      }

      // Email/Password flow: email is already @nhitm.ac.in
      const user = await UserService.createUser({
        uid: uid,
        displayName: req.body.displayName || "New Student",
        email: email,
        photoURL: null,
        role: "STUDENT",
        verificationStatus: "verified", // automatically verified as it's the university email
        universityName: req.body.universityName || "NHITM",
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

      // Generate 6 digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store in redis for 5 minutes
      if (redisClient) {
        await redisClient.set(`otp:${universityEmail}`, otp, "EX", 300);
      } else {
        // Fallback for development if redis is not configured
        console.warn(`[DEV] OTP for ${universityEmail} is ${otp}`);
      }
      
      // In a real app, send the email here
      console.log(`Sending OTP ${otp} to ${universityEmail}`);

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

      // Verify OTP
      if (redisClient) {
        const storedOtp = await redisClient.get(`otp:${universityEmail}`);
        if (!storedOtp || storedOtp !== otp) {
          throw ApiError.badRequest("Invalid or expired OTP");
        }
        await redisClient.del(`otp:${universityEmail}`);
      } else {
        // Fallback for dev: accept '123456' if redis is offline
        if (otp !== '123456') {
          throw ApiError.badRequest("Invalid or expired OTP");
        }
      }

      // Check if user already exists
      let user;
      try {
        user = await UserService.getUserByUid(uid);
      } catch (err) {
        // User not found, create new
      }

      if (user) {
        await UserService.updateUser(user.id!, {
          universityEmail,
          verificationStatus: "verified"
        });
        user = await UserService.getUserById(user.id!);
      } else {
        user = await UserService.createUser({
          uid,
          displayName: req.firebaseUser?.name || "New Student",
          email: googleEmail, // The login email
          googleEmail: googleEmail,
          photoURL: req.firebaseUser?.picture || null,
          role: "STUDENT",
          verificationStatus: "verified",
          universityName: "NHITM",
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
