import {
  CollectionReference,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { db } from "../config/firebase.config";

export interface IBaseRepository<T extends { id?: string }> {
  create(data: Omit<T, "id">, customId?: string): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, data: Partial<Omit<T, "id">>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

export abstract class BaseRepository<T extends { id?: string }>
  implements IBaseRepository<T>
{
  protected readonly collection: CollectionReference<DocumentData>;

  constructor(collectionName: string) {
    this.collection = db.collection(collectionName);
  }

  public get collectionRef(): CollectionReference<DocumentData> {
    return this.collection;
  }

  protected docToData(doc: QueryDocumentSnapshot<DocumentData>): T {
    return {
      id: doc.id,
      ...doc.data(),
    } as T;
  }

  public async create(data: Omit<T, "id">, customId?: string): Promise<T> {
    const timestamp = new Date().toISOString();
    const payload = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    if (customId) {
      const docRef = this.collection.doc(customId);
      await docRef.set(payload);
      return { id: customId, ...payload } as unknown as T;
    } else {
      const docRef = await this.collection.add(payload);
      return { id: docRef.id, ...payload } as unknown as T;
    }
  }

  public async findById(id: string): Promise<T | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as T;
  }

  public async findAll(): Promise<T[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => this.docToData(doc));
  }

  public async update(id: string, data: Partial<Omit<T, "id">>): Promise<boolean> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return false;
    }

    const payload = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await docRef.update(payload);
    return true;
  }

  public async delete(id: string): Promise<boolean> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return false;
    }
    await docRef.delete();
    return true;
  }
}
