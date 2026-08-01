import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response.util";

export class AuthController {
  public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = {
        id: "user_" + Date.now(),
        uid: req.body.uid || "mock_uid",
        displayName: req.body.displayName || "New Student",
        email: req.body.email || "student@university.edu",
        photoURL: null,
        role: "STUDENT",
        verificationStatus: "unverified",
        universityName: req.body.universityName || "State University",
        universityEmail: req.body.email || "student@university.edu",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      res.status(201).json(ApiResponse.success("User registered successfully", user));
    } catch (error) {
      next(error);
    }
  }

  public static async getMe(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const currentUser = {
        id: "user_demo",
        uid: "uid_demo",
        displayName: "Alex Johnson",
        email: "alex@stanford.edu",
        photoURL: "https://lh3.googleusercontent.com/aida-public/AB6AXuAowrGEf4GSJpf7ZUiFF8RuZ3IHyvp39cboDESvKS2wRUHbQIh5ggvjsbEL4bH7UBrHs_cNUhkS_nDis_YCBDl2tiSrDn2_g460dLhHKlRJjgSO87htK97aWZwUaqQfamTgWcL8xsaQ7jAeOPWfjwtwBFizkLHEwv425SZoiXP7TTxUNebSiHEVS1ca9eI2_u5776DINjODOSRe1HAQgWFn3yeDozBIJ5a4VIOvxW2xO0nfnkrVak4ma6sQfjzawd_JdPZWceVk9EHi",
        role: "STUDENT",
        verificationStatus: "verified",
        universityName: "Stanford University",
        universityEmail: "alex@stanford.edu",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      res.status(200).json(ApiResponse.success("User profile retrieved", currentUser));
    } catch (error) {
      next(error);
    }
  }

  public static async updateMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Profile updated", { ...req.body, updatedAt: new Date().toISOString() }));
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
