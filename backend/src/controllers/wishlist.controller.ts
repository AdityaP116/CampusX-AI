import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response.util";

export class WishlistController {
  public static async getWishlist(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Wishlist items retrieved", []));
    } catch (error) {
      next(error);
    }
  }

  public static async addToWishlist(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const item = {
        id: "wish_" + Date.now(),
        userId: "user_demo",
        productId: req.body.productId,
        createdAt: new Date().toISOString(),
      };
      res.status(201).json(ApiResponse.success("Added to wishlist", item));
    } catch (error) {
      next(error);
    }
  }

  public static async removeFromWishlist(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Removed from wishlist", null));
    } catch (error) {
      next(error);
    }
  }

  public static async checkWishlistStatus(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Wishlist status checked", { inWishlist: false }));
    } catch (error) {
      next(error);
    }
  }
}
