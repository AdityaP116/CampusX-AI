import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response.util";

export class ReviewsController {
  public static async getUserReviews(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Reviews retrieved", []));
    } catch (error) {
      next(error);
    }
  }

  public static async createReview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const review = {
        id: "rev_" + Date.now(),
        reviewerId: "user_demo",
        ...req.body,
        createdAt: new Date().toISOString(),
      };
      res.status(201).json(ApiResponse.success("Review created", review));
    } catch (error) {
      next(error);
    }
  }

  public static async getReviewById(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Review details", null));
    } catch (error) {
      next(error);
    }
  }
}
