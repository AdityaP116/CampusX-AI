import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";
import { chatValidators } from "../validators";

const router = Router();

router.get("/conversations", authenticate, ChatController.getConversations);
router.post("/conversations", authenticate, ChatController.createConversation);
router.get("/conversations/:id", authenticate, ChatController.getConversationById);
router.get("/conversations/:id/messages", authenticate, ChatController.getMessages);
router.post("/conversations/:id/messages", authenticate, validateRequest(chatValidators.sendMessage), ChatController.sendMessage);
router.patch("/conversations/:id/read", authenticate, ChatController.markAsRead);

export default router;
