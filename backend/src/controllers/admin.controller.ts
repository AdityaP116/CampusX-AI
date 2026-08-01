import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response.util";

export class AdminController {
  public static async getStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = {
        totalUsers: 1420,
        verifiedUsers: 1280,
        totalListings: 5430,
        activeListings: 4120,
        totalTransactions: 890,
        reportedItems: 14,
      };
      res.status(200).json(ApiResponse.success("Admin stats retrieved", stats));
    } catch (error) {
      next(error);
    }
  }

  public static async getUsers(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Users list", { items: [], total: 0, page: 1, limit: 10, hasMore: false }));
    } catch (error) {
      next(error);
    }
  }

  public static async verifyUser(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("User verified", null));
    } catch (error) {
      next(error);
    }
  }

  public static async updateUserRole(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("User role updated", null));
    } catch (error) {
      next(error);
    }
  }

  public static async getListings(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Admin listings", { items: [], total: 0, page: 1, limit: 10, hasMore: false }));
    } catch (error) {
      next(error);
    }
  }

  public static async deleteListing(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Listing removed by admin", null));
    } catch (error) {
      next(error);
    }
  }

  public static async getReports(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Reports list", []));
    } catch (error) {
      next(error);
    }
  }

  public static async resolveReport(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Report resolved", null));
    } catch (error) {
      next(error);
    }
  }
}
