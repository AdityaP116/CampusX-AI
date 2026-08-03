import { BaseRepository } from "./base.repository";
import { Product } from "../models";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

export interface PaginatedResult<T> {
  items: T[];
  total?: number;
  lastDocId?: string;
  hasMore: boolean;
}

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super("products");
  }

  public async findPaginated(limit: number, lastDocId?: string): Promise<PaginatedResult<Product>> {
    let query = this.collection.orderBy("createdAt", "desc").limit(limit);

    if (lastDocId) {
      const lastDoc = await this.collection.doc(lastDocId).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    const items = snapshot.docs.map((doc) => this.docToData(doc as QueryDocumentSnapshot<DocumentData>));

    return {
      items,
      hasMore: items.length === limit,
      lastDocId: items.length > 0 ? items[items.length - 1]?.id : undefined,
    };
  }

  public async findBySellerId(sellerId: string): Promise<Product[]> {
    const snapshot = await this.collection.where("sellerId", "==", sellerId).orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc) => this.docToData(doc as QueryDocumentSnapshot<DocumentData>));
  }
}

export const productRepository = new ProductRepository();
