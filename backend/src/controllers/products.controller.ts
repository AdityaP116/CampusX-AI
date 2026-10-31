import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response.util";
import { ApiError } from "../utils/api-error";
import { ProductService } from "../services";

export class ProductsController {
  public static async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const lastDocId = req.query.lastDocId as string | undefined;

      const filters = {
        category: req.query.category as string | undefined,
        condition: req.query.condition as string | undefined,
        search: (req.query.search || req.query.searchQuery) as string | undefined,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      };

      const paginated = await ProductService.getProducts(page, limit, lastDocId, filters);
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
      // Always prefer the Firebase Auth UID for sellerId so it matches Firebase Security Rules
      const sellerId = req.firebaseUser?.uid || req.user?.uid || req.user?.id;
      if (!sellerId) throw ApiError.unauthorized();

      const images = Array.isArray(req.body.images) ? req.body.images : [];
      const category = req.body.category || req.body.categoryId || "other";
      const location = req.body.location || req.body.meetupLocation || "Campus";
      const meetupLocation = req.body.meetupLocation || location;
      const transactionType = req.body.transactionType || "SELL";

      const newProduct = await ProductService.createProduct({
        ...req.body,
        sellerId,
        category,
        categoryId: req.body.categoryId || category,
        location,
        meetupLocation,
        transactionType,
        images,
        thumbnailUrl: req.body.thumbnailUrl || (images.length > 0 ? images[0] : ""),
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
      const sellerId = req.firebaseUser?.uid || req.user?.uid || req.user?.id;
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
      const sellerId = req.firebaseUser?.uid || req.user?.uid || req.user?.id;
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
      const sellerId = req.params.sellerId as string;
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
