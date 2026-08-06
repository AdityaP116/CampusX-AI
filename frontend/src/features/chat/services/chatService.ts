import { auth, db } from "@/lib/firebase";
import { collection, query, where, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  product?: {
    id: string;
    title: string;
    thumbnailUrl: string;
    price: number;
  };
  unreadCount: number;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  status: "sent" | "delivered" | "read";
  createdAt: string;
}

async function getAuthToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("Unauthorized");
  return user.getIdToken();
}

export async function createConversation(sellerId: string, product?: { id: string, title: string, thumbnailUrl: string, price: number }) {
  const token = await getAuthToken();
  const res = await fetch(`${BACKEND_URL}/chat/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ participants: [sellerId], product }),
  });

  if (!res.ok) {
    throw new Error("Failed to create conversation");
  }

  return res.json();
}

export async function sendMessage(conversationId: string, content: string) {
  const token = await getAuthToken();
  const res = await fetch(`${BACKEND_URL}/chat/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}

export async function markAsRead(conversationId: string) {
  const token = await getAuthToken();
  await fetch(`${BACKEND_URL}/chat/conversations/${conversationId}/read`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function subscribeToConversations(userId: string, callback: (conversations: Conversation[]) => void) {
  const q = query(
    collection(db, "conversations"),
    where("participants", "array-contains", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const convs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Conversation[];
    
    // Sort client-side to avoid needing composite indexes in Firebase
    convs.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    callback(convs);
  });
}

export function subscribeToMessages(conversationId: string, callback: (messages: Message[]) => void) {
  const q = query(
    collection(db, "messages"),
    where("conversationId", "==", conversationId)
  );

  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];
    
    // Sort client-side to avoid needing composite indexes in Firebase
    msgs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    callback(msgs);
  });
}

// Get user info (mocked or fetched from another service)
export async function getUserInfo(userId: string) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
  return { displayName: "CampusX User", avatar: "https://ui-avatars.com/api/?name=User" };
}
