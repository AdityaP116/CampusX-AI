import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebase.config";
import { ApiError } from "../utils/api-error";
import { UserService } from "../services/user.service";

// Extend Express Request interface to include user
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: any; // Replace with actual User type when we define it here, for now any
      firebaseUser?: any;
    }
  }
}

export const authenticate = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Missing or invalid authorization header");
    }

    const token = authHeader.split("Bearer ")[1];
    if (!token) {
      throw ApiError.unauthorized("Missing or invalid authorization token");
    }
    const decodedToken = await auth.verifyIdToken(token);
    
    req.firebaseUser = decodedToken;

    // Optionally fetch the full user from database
    try {
      const user = await UserService.getUserByUid(decodedToken.uid);
      req.user = user;
    } catch (e) {
      // If user doesn't exist yet (e.g. during registration), we just have firebaseUser
    }

    next();
  } catch (error: any) {
    next(ApiError.unauthorized(error.message || "Invalid or expired token"));
  }
};
