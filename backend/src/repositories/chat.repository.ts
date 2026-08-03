import { BaseRepository } from "./base.repository";
import { Conversation, Message } from "../models";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

export class ConversationRepository extends BaseRepository<Conversation> {
  constructor() {
    super("conversations");
  }

  public async findByParticipant(userId: string): Promise<Conversation[]> {
    const snapshot = await this.collection.where("participants", "array-contains", userId).orderBy("updatedAt", "desc").get();
    return snapshot.docs.map((doc) => this.docToData(doc as QueryDocumentSnapshot<DocumentData>));
  }
}

export class MessageRepository extends BaseRepository<Message> {
  constructor() {
    super("messages");
  }

  public async findByConversationId(conversationId: string): Promise<Message[]> {
    const snapshot = await this.collection.where("conversationId", "==", conversationId).orderBy("createdAt", "asc").get();
    return snapshot.docs.map((doc) => this.docToData(doc as QueryDocumentSnapshot<DocumentData>));
  }
}

export const conversationRepository = new ConversationRepository();
export const messageRepository = new MessageRepository();
