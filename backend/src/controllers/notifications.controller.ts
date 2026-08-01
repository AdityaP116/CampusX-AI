import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response.util";

export class NotificationsController {
  public static async getNotifications(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Notifications retrieved", []));
    } catch (error) {
      next(error);
    }
  }

  public static async getUnreadCount(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Unread count", { count: 0 }));
    } catch (error) {
      next(error);
    }
  }

  public static async markAsRead(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Notification marked read", null));
    } catch (error) {
      next(error);
    }
  }

  public static async markAllAsRead(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("All notifications marked read", null));
    } catch (error) {
      next(error);
    }
  }

  public static async deleteNotification(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Notification deleted", null));
    } catch (error) {
      next(error);
    }
  }
}
