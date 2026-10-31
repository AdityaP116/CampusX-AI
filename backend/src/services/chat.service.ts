import { conversationRepository, messageRepository } from "../repositories/chat.repository";
import { Conversation, Message } from "../models";
import { ApiError } from "../utils/api-error";
import { db } from "../config/firebase.config";
import { FieldValue } from "firebase-admin/firestore";

export class ChatService {
  public static async getConversations(userId: string): Promise<Conversation[]> {
    return await conversationRepository.findByParticipant(userId);
  }

  public static async getConversationById(id: string): Promise<Conversation> {
    const conv = await conversationRepository.findById(id);
    if (!conv) {
      throw ApiError.notFound("Conversation not found");
    }
    return conv;
  }

  public static async createConversation(data: Omit<Conversation, "id">): Promise<Conversation> {
    return await conversationRepository.create(data);
  }

  public static async getMessages(conversationId: string): Promise<Message[]> {
    return await messageRepository.findByConversationId(conversationId);
  }

  public static async sendMessage(conversationId: string, data: Omit<Message, "id" | "conversationId">): Promise<Message> {
    const conv = await conversationRepository.findById(conversationId);
    if (!conv) {
      throw ApiError.notFound("Conversation not found");
    }

    const batch = db.batch();
    
    const msgRef = messageRepository.collectionRef.doc();
    const msgData: Message = {
      ...data,
      conversationId,
      id: msgRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Message;
    
    batch.set(msgRef, msgData);

    const convRef = conversationRepository.collectionRef.doc(conversationId);
    batch.update(convRef, {
      lastMessage: msgData,
      unreadCount: FieldValue.increment(1),
      updatedAt: new Date().toISOString()
    });

    await batch.commit();

    return msgData;
  }

  public static async markAsRead(conversationId: string): Promise<boolean> {
    const success = await conversationRepository.update(conversationId, {
      unreadCount: 0
    });
    if (!success) {
      throw ApiError.notFound("Conversation not found");
    }
    return true;
  }
}
