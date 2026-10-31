import { BaseRepository } from "./base.repository";
import { User } from "../models";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super("users");
  }

  public async findByUid(uid: string): Promise<User | null> {
    // When customId is used, the document ID equals the Firebase Auth UID
    const directDoc = await this.collection.doc(uid).get();
    if (directDoc.exists) {
      return { id: directDoc.id, ...directDoc.data() } as User;
    }

    // Fallback to query by uid field for any legacy documents
    const snapshot = await this.collection.where("uid", "==", uid).limit(1).get();
    if (snapshot.empty || !snapshot.docs[0]) {
      return null;
    }
    return this.docToData(snapshot.docs[0] as QueryDocumentSnapshot<DocumentData>);
  }

  public async findByUniversityEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection
      .where("universityEmail", "==", email)
      .where("verificationStatus", "==", "verified")
      .limit(1)
      .get();
    if (snapshot.empty || !snapshot.docs[0]) {
      return null;
    }
    return this.docToData(snapshot.docs[0] as QueryDocumentSnapshot<DocumentData>);
  }
}

export const userRepository = new UserRepository();
