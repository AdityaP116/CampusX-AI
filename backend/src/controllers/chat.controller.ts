import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response.util";

const MOCK_CONVERSATIONS = [
  {
    id: "conv_1",
    participants: ["user_demo", "user_sarah"],
    lastMessage: {
      id: "msg_1",
      conversationId: "conv_1",
      senderId: "user_sarah",
      content: "Hi Alex! I saw your post for the MacBook Pro.",
      status: "read",
      createdAt: new Date().toISOString(),
    },
    product: {
      id: "prod_1",
      title: "MacBook Pro 14\" M3 Max",
      thumbnailUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZR3QRD0_1RVb_ARwgpB_MM7crfSE2jwV8WfDrsyjy_WCgiGgKkO1ZZqkv3O5ycXeOtvUWm56QRsP_IxibyLLQDnU4EPS790CTwQcx5JVTwlryhLG080VGRE_iynnJJ7wsyLaydz86eMErUCfJF7pwXakEyNGdyPdAD1DbUHdigeN4dKwWxef9sRs5XllTF74OA_PcyHX0co-vmGMjQsIonGhaEcaq8qivTQjLNGHX-vseF4aUR3mDJssVyHf4-3xVHb8Yglpk9FpL",
      price: 1450,
    },
    unreadCount: 1,
    updatedAt: new Date().toISOString(),
  }
];

export class ChatController {
  public static async getConversations(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Conversations retrieved", MOCK_CONVERSATIONS));
    } catch (error) {
      next(error);
    }
  }

  public static async getConversationById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const conv = MOCK_CONVERSATIONS.find(c => c.id === req.params.id) || MOCK_CONVERSATIONS[0];
      res.status(200).json(ApiResponse.success("Conversation details", conv));
    } catch (error) {
      next(error);
    }
  }

  public static async createConversation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newConv = {
        id: "conv_" + Date.now(),
        participants: req.body.participants || ["user_demo"],
        lastMessage: null,
        unreadCount: 0,
        updatedAt: new Date().toISOString(),
      };
      res.status(201).json(ApiResponse.success("Conversation created", newConv));
    } catch (error) {
      next(error);
    }
  }

  public static async getMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const messages = [
        {
          id: "msg_1",
          conversationId: req.params.id,
          senderId: "user_sarah",
          content: "Hi Alex! I saw your post for the MacBook Pro.",
          status: "read",
          createdAt: new Date().toISOString(),
        }
      ];
      res.status(200).json(ApiResponse.success("Messages retrieved", messages));
    } catch (error) {
      next(error);
    }
  }

  public static async sendMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const msg = {
        id: "msg_" + Date.now(),
        conversationId: req.params.id,
        senderId: req.body.senderId || "user_demo",
        content: req.body.content || "",
        status: "sent",
        createdAt: new Date().toISOString(),
      };
      res.status(201).json(ApiResponse.success("Message sent", msg));
    } catch (error) {
      next(error);
    }
  }

  public static async markAsRead(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Conversation marked as read", null));
    } catch (error) {
      next(error);
    }
  }
}
