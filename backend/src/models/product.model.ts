import { BaseEntity } from "./index";
import { User } from "./user.model";

export interface Product extends BaseEntity {
  title: string;
  description: string;
  price: number;
  transactionType: "SELL" | "RENT" | "EXCHANGE";
  condition: "new" | "like_new" | "good" | "fair" | "poor";
  status: "active" | "sold" | "hidden";
  categoryId: string;
  images: string[];
  thumbnailUrl: string;
  sellerId: string;
  seller?: Partial<User>; // Denormalized seller info
  location: string;
  campusName: string;
  tags: string[];
  viewCount: number;
  wishlistCount: number;
  isVerified: boolean;
}
