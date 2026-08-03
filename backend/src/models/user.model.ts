import { BaseEntity } from "./index";

export interface User extends BaseEntity {
  uid: string; // Firebase Auth UID
  displayName: string;
  email: string;
  photoURL: string | null;
  role: "STUDENT" | "ADMIN" | "MODERATOR";
  verificationStatus: "unverified" | "pending" | "verified" | "rejected";
  universityName: string;
  universityEmail: string;
  studentIdUrl?: string;
}
