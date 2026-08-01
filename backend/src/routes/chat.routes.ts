import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";

const router = Router();

router.get("/conversations", ChatController.getConversations);
router.post("/conversations", ChatController.createConversation);
router.get("/conversations/:id", ChatController.getConversationById);
router.get("/conversations/:id/messages", ChatController.getMessages);
router.post("/conversations/:id/messages", ChatController.sendMessage);
router.patch("/conversations/:id/read", ChatController.markAsRead);

export default router;
