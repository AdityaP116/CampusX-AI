import { Router } from "express";
import { NotificationsController } from "../controllers/notifications.controller";

const router = Router();

router.get("/", NotificationsController.getNotifications);
router.get("/unread-count", NotificationsController.getUnreadCount);
router.patch("/read-all", NotificationsController.markAllAsRead);
router.patch("/:id/read", NotificationsController.markAsRead);
router.delete("/:id", NotificationsController.deleteNotification);

export default router;
