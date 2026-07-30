// =========================================================
// CampusX TypeScript Types
// Central type definitions for the entire frontend
// =========================================================

// ----- User & Auth -----

export type UserRole = "STUDENT" | "ADMIN";

export type VerificationStatus =
  | "unverified"
  | "email_verified"
  | "id_uploaded"
  | "verified"
  | "rejected";

export interface User {
  id: string;
  uid: string; // Firebase UID
  displayName: string;
  email: string;
  photoURL: string | null;
  role: UserRole;
  verificationStatus: VerificationStatus;
  universityName: string | null;
  universityEmail: string | null;
  createdAt: string;
  updatedAt: string;
}

// ----- Products -----

export type TransactionType = "BUY" | "SELL" | "RENT" | "EXCHANGE";
export type ProductCondition = "new" | "like_new" | "good" | "fair" | "poor";
export type ProductStatus = "active" | "pending" | "sold" | "rented" | "expired";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit?: string; // e.g. "per hour" for services
  transactionType: TransactionType;
  condition: ProductCondition;
  status: ProductStatus;
  categoryId: string;
  images: string[];
  thumbnailUrl: string | null;
  sellerId: string;
  seller?: Pick<User, "id" | "displayName" | "photoURL" | "verificationStatus">;
  location: string;
  campusName: string | null;
  tags: string[];
  viewCount: number;
  wishlistCount: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ----- Chat -----

export type MessageStatus = "sent" | "delivered" | "read";

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  status: MessageStatus;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[]; // user IDs
  lastMessage: ChatMessage | null;
  product?: Pick<Product, "id" | "title" | "thumbnailUrl" | "price">;
  unreadCount: number;
  updatedAt: string;
}

// ----- Notifications -----

export type NotificationType =
  | "message"
  | "offer"
  | "wishlist"
  | "system"
  | "review"
  | "verification";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

// ----- Reviews -----

export interface Review {
  id: string;
  reviewerId: string;
  revieweeId: string;
  productId?: string;
  rating: number; // 1–5
  comment: string;
  createdAt: string;
  reviewer?: Pick<User, "id" | "displayName" | "photoURL">;
}

// ----- Wishlist -----

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  createdAt: string;
}

// ----- API Responses -----

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: unknown[] | null;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// ----- Pagination -----

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ----- Filters -----

export interface ProductFilters {
  query?: string;
  categoryId?: string;
  transactionType?: TransactionType;
  condition?: ProductCondition;
  minPrice?: number;
  maxPrice?: number;
  campusName?: string;
  sortBy?: "newest" | "price_asc" | "price_desc" | "popular";
  page?: number;
  limit?: number;
}

// ----- Admin -----

export interface AdminStats {
  totalUsers: number;
  verifiedUsers: number;
  totalListings: number;
  activeListings: number;
  totalTransactions: number;
  reportedItems: number;
}
