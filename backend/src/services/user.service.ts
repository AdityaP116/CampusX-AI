import { userRepository } from "../repositories/user.repository";
import { User } from "../models";
import { ApiError } from "../utils/api-error";

export class UserService {
  public static async getUserById(id: string): Promise<User> {
    const user = await userRepository.findById(id);
    if (!user) {
      throw ApiError.notFound("User not found");
    }
    return user;
  }

  public static async getUserByUid(uid: string): Promise<User> {
    const user = await userRepository.findByUid(uid);
    if (!user) {
      throw ApiError.notFound("User not found for this Firebase account");
    }
    return user;
  }

  public static async createUser(data: Omit<User, "id">): Promise<User> {
    // Check if user already exists
    const existing = await userRepository.findByUid(data.uid);
    if (existing) {
      throw ApiError.badRequest("User with this UID already exists");
    }

    if (data.verificationStatus === "verified" || data.provider === "email") {
      const existingEmail = await userRepository.findByUniversityEmail(data.universityEmail);
      if (existingEmail) {
        throw ApiError.badRequest("This college email is already linked to another account");
      }
    }

    // Pass data.uid as customId so Firestore document ID equals Firebase Auth UID
    return await userRepository.create(data, data.uid);
  }

  public static async updateUser(id: string, data: Partial<Omit<User, "id">>): Promise<boolean> {
    const success = await userRepository.update(id, data);
    if (!success) {
      throw ApiError.notFound("User not found or update failed");
    }
    return true;
  }
}
