// =========================================================
// Reviews API Service
// =========================================================

import apiClient from "./api.client";
import type { ApiSuccessResponse, Review } from "@/types";

const ReviewsApi = {
  /** Get reviews for a user */
  getUserReviews: (userId: string) =>
    apiClient.get<ApiSuccessResponse<Review[]>>(`/reviews/user/${userId}`),

  /** Create a review for a completed transaction */
  createReview: (payload: {
    revieweeId: string;
    productId?: string;
    rating: number;
    comment: string;
  }) => apiClient.post<ApiSuccessResponse<Review>>("/reviews", payload),

  /** Get review by ID */
  getReviewById: (reviewId: string) =>
    apiClient.get<ApiSuccessResponse<Review>>(`/reviews/${reviewId}`),
};

export default ReviewsApi;
