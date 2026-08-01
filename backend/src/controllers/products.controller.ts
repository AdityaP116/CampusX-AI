import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response.util";

const MOCK_PRODUCTS = [
  {
    id: "prod_1",
    title: "MacBook Pro 14\" M3 Max",
    description: "Mint condition, battery cycle count 12. Comes with original charger and box.",
    price: 1450,
    transactionType: "SELL",
    condition: "like_new",
    status: "active",
    categoryId: "tech",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAZR3QRD0_1RVb_ARwgpB_MM7crfSE2jwV8WfDrsyjy_WCgiGgKkO1ZZqkv3O5ycXeOtvUWm56QRsP_IxibyLLQDnU4EPS790CTwQcx5JVTwlryhLG080VGRE_iynnJJ7wsyLaydz86eMErUCfJF7pwXakEyNGdyPdAD1DbUHdigeN4dKwWxef9sRs5XllTF74OA_PcyHX0co-vmGMjQsIonGhaEcaq8qivTQjLNGHX-vseF4aUR3mDJssVyHf4-3xVHb8Yglpk9FpL"],
    thumbnailUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZR3QRD0_1RVb_ARwgpB_MM7crfSE2jwV8WfDrsyjy_WCgiGgKkO1ZZqkv3O5ycXeOtvUWm56QRsP_IxibyLLQDnU4EPS790CTwQcx5JVTwlryhLG080VGRE_iynnJJ7wsyLaydz86eMErUCfJF7pwXakEyNGdyPdAD1DbUHdigeN4dKwWxef9sRs5XllTF74OA_PcyHX0co-vmGMjQsIonGhaEcaq8qivTQjLNGHX-vseF4aUR3mDJssVyHf4-3xVHb8Yglpk9FpL",
    sellerId: "user_sarah",
    seller: {
      id: "user_sarah",
      displayName: "Sarah Miller",
      photoURL: "https://lh3.googleusercontent.com/aida-public/AB6AXuAowrGEf4GSJpf7ZUiFF8RuZ3IHyvp39cboDESvKS2wRUHbQIh5ggvjsbEL4bH7UBrHs_cNUhkS_nDis_YCBDl2tiSrDn2_g460dLhHKlRJjgSO87htK97aWZwUaqQfamTgWcL8xsaQ7jAeOPWfjwtwBFizkLHEwv425SZoiXP7TTxUNebSiHEVS1ca9eI2_u5776DINjODOSRe1HAQgWFn3yeDozBIJ5a4VIOvxW2xO0nfnkrVak4ma6sQfjzawd_JdPZWceVk9EHi",
      verificationStatus: "verified",
    },
    location: "Tressider Student Union",
    campusName: "Stanford University",
    tags: ["Apple", "MacBook", "Laptops"],
    viewCount: 342,
    wishlistCount: 28,
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_2",
    title: "Organic Chemistry 8th Edition (Vollhardt)",
    description: "No highlighting inside, minor wear on cover. Perfect for CHEM 33.",
    price: 45,
    transactionType: "SELL",
    condition: "good",
    status: "active",
    categoryId: "academic",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDZKLvr8GHSsgEb-xkKX8Fj9GaTEEmK07dE11sP0HbJ9Lv2V-5JFwKEp5pVPg-OBbQiEdAOSkwlAmehrU9wZrDQTzmb__Vik1fO58hsolfFFiLBbZSe6GRXLn9Z4pXs8rXktc4dTS-sLI3VUxHkhTi8a59ErTHjlW0SyJdPbaU6hSNsVdnN9LbtWqLkRoKXD2oPDskvLqEartF_x-J7htRJfgq4upmLh2yLyVCdfkdOmj-Qk0sf7FN75jCIHwhEv4q6tnbkYbDe5jQK"],
    thumbnailUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZKLvr8GHSsgEb-xkKX8Fj9GaTEEmK07dE11sP0HbJ9Lv2V-5JFwKEp5pVPg-OBbQiEdAOSkwlAmehrU9wZrDQTzmb__Vik1fO58hsolfFFiLBbZSe6GRXLn9Z4pXs8rXktc4dTS-sLI3VUxHkhTi8a59ErTHjlW0SyJdPbaU6hSNsVdnN9LbtWqLkRoKXD2oPDskvLqEartF_x-J7htRJfgq4upmLh2yLyVCdfkdOmj-Qk0sf7FN75jCIHwhEv4q6tnbkYbDe5jQK",
    sellerId: "user_david",
    seller: {
      id: "user_david",
      displayName: "David Chen",
      photoURL: null,
      verificationStatus: "verified",
    },
    location: "Science Quad",
    campusName: "Stanford University",
    tags: ["Chemistry", "Textbook", "STEM"],
    viewCount: 189,
    wishlistCount: 12,
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export class ProductsController {
  public static async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paginated = {
        items: MOCK_PRODUCTS,
        total: MOCK_PRODUCTS.length,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        hasMore: false,
      };
      res.status(200).json(ApiResponse.success("Products retrieved", paginated));
    } catch (error) {
      next(error);
    }
  }

  public static async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = MOCK_PRODUCTS.find((p) => p.id === req.params.id) || MOCK_PRODUCTS[0];
      res.status(200).json(ApiResponse.success("Product details retrieved", product));
    } catch (error) {
      next(error);
    }
  }

  public static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newProduct = {
        id: "prod_" + Date.now(),
        ...req.body,
        status: "active",
        viewCount: 0,
        wishlistCount: 0,
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      res.status(201).json(ApiResponse.success("Product created successfully", newProduct));
    } catch (error) {
      next(error);
    }
  }

  public static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Product updated", { id: req.params.id, ...req.body }));
    } catch (error) {
      next(error);
    }
  }

  public static async deleteProduct(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Product deleted", null));
    } catch (error) {
      next(error);
    }
  }

  public static async getProductsBySeller(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Seller listings retrieved", MOCK_PRODUCTS));
    } catch (error) {
      next(error);
    }
  }

  public static async getTrendingProducts(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(ApiResponse.success("Trending products retrieved", MOCK_PRODUCTS));
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
