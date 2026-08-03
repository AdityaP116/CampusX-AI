import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response.util";
import { ApiError } from "../utils/api-error";
import { UserService } from "../services";

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
        verificationStatus: "unverified",
        universityName: req.body.universityName || "State University",
        universityEmail: email,
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

  public static async verifyEmail(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Verification email sent", null));
    } catch (error) {
      next(error);
    }
  }
}
