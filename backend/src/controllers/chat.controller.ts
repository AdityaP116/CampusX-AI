import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response.util";
import { ApiError } from "../utils/api-error";
import { ChatService } from "../services";

export class ChatController {
  public static async getConversations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id || req.firebaseUser?.uid;
      if (!userId) throw ApiError.unauthorized();
      const conversations = await ChatService.getConversations(userId);
      res.status(200).json(ApiResponse.success("Conversations retrieved", conversations));
    } catch (error) {
      next(error);
    }
  }

  public static async getConversationById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id || req.firebaseUser?.uid;
      if (!userId) throw ApiError.unauthorized();

      const conv = await ChatService.getConversationById(req.params.id as string);
      if (!conv.participants.includes(userId)) {
        throw ApiError.forbidden("You are not a participant in this conversation");
      }
      res.status(200).json(ApiResponse.success("Conversation details", conv));
    } catch (error) {
      next(error);
    }
  }

  public static async createConversation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id || req.firebaseUser?.uid;
      if (!userId) throw ApiError.unauthorized();
      
      const participants = req.body.participants || [];
      if (!participants.includes(userId)) {
        participants.push(userId);
      }

      const newConv = await ChatService.createConversation({
        participants,
        unreadCount: 0,
      });
      res.status(201).json(ApiResponse.success("Conversation created", newConv));
    } catch (error) {
      next(error);
    }
  }

  public static async getMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id || req.firebaseUser?.uid;
      if (!userId) throw ApiError.unauthorized();

      const conv = await ChatService.getConversationById(req.params.id as string);
      if (!conv.participants.includes(userId)) {
        throw ApiError.forbidden("You are not a participant in this conversation");
      }

      const messages = await ChatService.getMessages(req.params.id as string);
      res.status(200).json(ApiResponse.success("Messages retrieved", messages));
    } catch (error) {
      next(error);
    }
  }

  public static async sendMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id || req.firebaseUser?.uid;
      if (!userId) throw ApiError.unauthorized();

      const conv = await ChatService.getConversationById(req.params.id as string);
      if (!conv.participants.includes(userId)) {
        throw ApiError.forbidden("You are not a participant in this conversation");
      }

      const msg = await ChatService.sendMessage(req.params.id as string, {
        senderId: userId,
        content: req.body.content || "",
        status: "sent",
      });
      res.status(201).json(ApiResponse.success("Message sent", msg));
    } catch (error) {
      next(error);
    }
  }

  public static async markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id || req.firebaseUser?.uid;
      if (!userId) throw ApiError.unauthorized();

      const conv = await ChatService.getConversationById(req.params.id as string);
      if (!conv.participants.includes(userId)) {
        throw ApiError.forbidden("You are not a participant in this conversation");
      }

      await ChatService.markAsRead(req.params.id as string);
      res.status(200).json(ApiResponse.success("Conversation marked as read", null));
    } catch (error) {
      next(error);
    }
  }
}
