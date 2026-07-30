// =========================================================
// Products API Service
// =========================================================

import apiClient from "./api.client";
import type {
  ApiSuccessResponse,
  PaginatedResponse,
  Product,
  ProductFilters,
} from "@/types";

const ProductsApi = {
  /** List products with optional filters and pagination */
  getProducts: (filters?: ProductFilters) =>
    apiClient.get<ApiSuccessResponse<PaginatedResponse<Product>>>("/products", {
      params: filters,
    }),

  /** Get a single product by ID */
  getProductById: (id: string) =>
    apiClient.get<ApiSuccessResponse<Product>>(`/products/${id}`),

  /** Create a new listing */
  createProduct: (formData: FormData) =>
    apiClient.post<ApiSuccessResponse<Product>>("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /** Update an existing listing */
  updateProduct: (id: string, payload: Partial<Product>) =>
    apiClient.patch<ApiSuccessResponse<Product>>(`/products/${id}`, payload),

  /** Delete a listing */
  deleteProduct: (id: string) =>
    apiClient.delete<ApiSuccessResponse<null>>(`/products/${id}`),

  /** Get listings by a specific seller */
  getProductsBySeller: (sellerId: string) =>
    apiClient.get<ApiSuccessResponse<Product[]>>(`/products/seller/${sellerId}`),

  /** Get trending / featured products */
  getTrendingProducts: () =>
    apiClient.get<ApiSuccessResponse<Product[]>>("/products/trending"),

  /** Report a listing */
  reportProduct: (id: string, reason: string) =>
    apiClient.post<ApiSuccessResponse<null>>(`/products/${id}/report`, { reason }),
};

export default ProductsApi;
