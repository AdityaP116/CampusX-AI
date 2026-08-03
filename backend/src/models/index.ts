export interface BaseEntity {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export * from "./user.model";
export * from "./product.model";
export * from "./chat.model";
