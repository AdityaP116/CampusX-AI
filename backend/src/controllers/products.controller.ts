import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response.util";
import { ApiError } from "../utils/api-error";
import { ProductService } from "../services";

export class ProductsController {
  public static async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const lastDocId = req.query.lastDocId as string | undefined;
      
      const paginated = await ProductService.getProducts(page, limit, lastDocId);
      res.status(200).json(ApiResponse.success("Products retrieved", paginated));
    } catch (error) {
      next(error);
    }
  }

  public static async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await ProductService.getProductById(req.params.id as string);
      res.status(200).json(ApiResponse.success("Product details retrieved", product));
    } catch (error) {
      next(error);
    }
  }

  public static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sellerId = req.user?.id || req.firebaseUser?.uid;
      if (!sellerId) throw ApiError.unauthorized();

      const newProduct = await ProductService.createProduct({
        ...req.body,
        sellerId,
        status: "active",
        viewCount: 0,
        wishlistCount: 0,
        isVerified: true,
      });
      res.status(201).json(ApiResponse.success("Product created successfully", newProduct));
    } catch (error) {
      next(error);
    }
  }

  public static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sellerId = req.user?.id || req.firebaseUser?.uid;
      if (!sellerId) throw ApiError.unauthorized();

      const existingProduct = await ProductService.getProductById(req.params.id as string);
      if (existingProduct.sellerId !== sellerId) {
        throw ApiError.forbidden("You do not have permission to update this product");
      }

      await ProductService.updateProduct(req.params.id as string, req.body);
      const updatedProduct = await ProductService.getProductById(req.params.id as string);
      res.status(200).json(ApiResponse.success("Product updated", updatedProduct));
    } catch (error) {
      next(error);
    }
  }

  public static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sellerId = req.user?.id || req.firebaseUser?.uid;
      if (!sellerId) throw ApiError.unauthorized();

      const existingProduct = await ProductService.getProductById(req.params.id as string);
      if (existingProduct.sellerId !== sellerId) {
        throw ApiError.forbidden("You do not have permission to delete this product");
      }

      await ProductService.deleteProduct(req.params.id as string);
      res.status(200).json(ApiResponse.success("Product deleted", null));
    } catch (error) {
      next(error);
    }
  }

  public static async getProductsBySeller(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // In a real scenario, this might come from params or a verified token
      const sellerId = (req.params.sellerId as string) || "user_demo"; 
      const products = await ProductService.getProductsBySeller(sellerId);
      res.status(200).json(ApiResponse.success("Seller listings retrieved", products));
    } catch (error) {
      next(error);
    }
  }

  public static async getTrendingProducts(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paginated = await ProductService.getProducts(1, 10);
      res.status(200).json(ApiResponse.success("Trending products retrieved", paginated.items));
    } catch (error) {
      next(error);
    }
  }

  public static async reportProduct(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Product reported successfully", null));
    } catch (error) {
      next(error);
    }
  }
}
