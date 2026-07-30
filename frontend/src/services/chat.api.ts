// =========================================================
// Chat API Service
// =========================================================

import apiClient from "./api.client";
import type { ApiSuccessResponse, Conversation, ChatMessage } from "@/types";

const ChatApi = {
  /** Get all conversations for current user */
  getConversations: () =>
    apiClient.get<ApiSuccessResponse<Conversation[]>>("/chat/conversations"),

  /** Get a single conversation with messages */
  getConversation: (conversationId: string) =>
    apiClient.get<ApiSuccessResponse<Conversation>>(
      `/chat/conversations/${conversationId}`
    ),

  /** Start a new conversation (e.g., "Message Seller" on product page) */
  startConversation: (payload: {
    recipientId: string;
    productId?: string;
    initialMessage: string;
  }) =>
    apiClient.post<ApiSuccessResponse<Conversation>>("/chat/conversations", payload),

  /** Get messages in a conversation (paginated) */
  getMessages: (conversationId: string, page = 1) =>
    apiClient.get<ApiSuccessResponse<ChatMessage[]>>(
      `/chat/conversations/${conversationId}/messages`,
      { params: { page } }
    ),

  /** Send a message */
  sendMessage: (conversationId: string, content: string) =>
    apiClient.post<ApiSuccessResponse<ChatMessage>>(
      `/chat/conversations/${conversationId}/messages`,
      { content }
    ),

  /** Mark all messages in a conversation as read */
  markAsRead: (conversationId: string) =>
    apiClient.patch<ApiSuccessResponse<null>>(
      `/chat/conversations/${conversationId}/read`
    ),
};

export default ChatApi;
