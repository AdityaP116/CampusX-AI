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
  category?: string;
  images: string[];
  thumbnailUrl: string;
  sellerId: string;
  seller?: Partial<User>;
  location: string;
  meetupLocation?: string;
  campusName: string;
  tags: string[];
  viewCount: number;
  wishlistCount: number;
  isVerified: boolean;
  negotiable?: boolean;
  listingType?: string;
}
