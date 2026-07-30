// =========================================================
// Wishlist API Service
// =========================================================

import apiClient from "./api.client";
import type { ApiSuccessResponse, WishlistItem } from "@/types";

const WishlistApi = {
  /** Get current user's wishlist */
  getWishlist: () =>
    apiClient.get<ApiSuccessResponse<WishlistItem[]>>("/wishlist"),

  /** Add a product to wishlist */
  addToWishlist: (productId: string) =>
    apiClient.post<ApiSuccessResponse<WishlistItem>>("/wishlist", { productId }),

  /** Remove a product from wishlist */
  removeFromWishlist: (productId: string) =>
    apiClient.delete<ApiSuccessResponse<null>>(`/wishlist/${productId}`),

  /** Check if a specific product is in user's wishlist */
  isInWishlist: (productId: string) =>
    apiClient.get<ApiSuccessResponse<{ inWishlist: boolean }>>(
      `/wishlist/check/${productId}`
    ),
};

export default WishlistApi;
