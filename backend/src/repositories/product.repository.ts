import { BaseRepository } from "./base.repository";
import { Product } from "../models";
import { QueryDocumentSnapshot, DocumentData, Query } from "firebase-admin/firestore";

export interface PaginatedResult<T> {
  items: T[];
  total?: number;
  lastDocId?: string;
  hasMore: boolean;
}

export interface ProductFilters {
  category?: string;
  condition?: string;
  status?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super("products");
  }

  public async findPaginated(
    limit: number,
    lastDocId?: string,
    filters?: ProductFilters
  ): Promise<PaginatedResult<Product>> {
    let query: Query<DocumentData> = this.collection;

    // Filter by active status by default unless specified
    const status = filters?.status || "active";
    query = query.where("status", "==", status);

    if (filters?.category && filters.category !== "all") {
      query = query.where("category", "==", filters.category);
    }

    if (filters?.condition && filters.condition !== "any") {
      query = query.where("condition", "==", filters.condition);
    }

    query = query.orderBy("createdAt", "desc").limit(limit);

    if (lastDocId) {
      const lastDoc = await this.collection.doc(lastDocId).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    let items = snapshot.docs.map((doc) => this.docToData(doc as QueryDocumentSnapshot<DocumentData>));

    // Post-query filtering for search query and price range
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    if (filters?.minPrice !== undefined) {
      items = items.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters?.maxPrice !== undefined) {
      items = items.filter((p) => p.price <= filters.maxPrice!);
    }

    return {
      items,
      hasMore: snapshot.docs.length === limit,
      lastDocId: items.length > 0 ? items[items.length - 1]?.id : undefined,
    };
  }

  public async findBySellerId(sellerId: string): Promise<Product[]> {
    const snapshot = await this.collection
      .where("sellerId", "==", sellerId)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => this.docToData(doc as QueryDocumentSnapshot<DocumentData>));
  }
}

export const productRepository = new ProductRepository();
