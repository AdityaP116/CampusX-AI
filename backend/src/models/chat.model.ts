import { BaseEntity } from "./index";

export interface Message extends BaseEntity {
  conversationId: string;
  senderId: string;
  content: string;
  status: "sent" | "delivered" | "read";
}

export interface Conversation extends BaseEntity {
  participants: string[];
  lastMessage?: Message;
  product?: {
    id: string;
    title: string;
    thumbnailUrl: string;
    price: number;
  };
  unreadCount: number;
}
