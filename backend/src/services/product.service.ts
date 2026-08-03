import { productRepository, PaginatedResult } from "../repositories/product.repository";
import { Product } from "../models";
import { ApiError } from "../utils/api-error";

export class ProductService {
  public static async getProducts(_page: number, limit: number, lastDocId?: string): Promise<PaginatedResult<Product>> {
    return await productRepository.findPaginated(limit, lastDocId);
  }

  public static async getProductById(id: string): Promise<Product> {
    const product = await productRepository.findById(id);
    if (!product) {
      throw ApiError.badRequest("Product not found");
    }
    return product;
  }

  public static async createProduct(data: Omit<Product, "id">): Promise<Product> {
    return await productRepository.create(data);
  }

  public static async updateProduct(id: string, data: Partial<Omit<Product, "id">>): Promise<boolean> {
    const success = await productRepository.update(id, data);
    if (!success) {
      throw ApiError.badRequest("Product not found or update failed");
    }
    return true;
  }

  public static async deleteProduct(id: string): Promise<boolean> {
    const success = await productRepository.delete(id);
    if (!success) {
      throw ApiError.badRequest("Product not found or delete failed");
    }
    return true;
  }

  public static async getProductsBySeller(sellerId: string): Promise<Product[]> {
    return await productRepository.findBySellerId(sellerId);
  }
}
