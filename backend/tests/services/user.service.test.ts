import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserService } from "../../src/services/user.service";
import { userRepository } from "../../src/repositories/user.repository";

// Mock the repository
vi.mock("../../src/repositories/user.repository", () => {
  return {
    userRepository: {
      findById: vi.fn(),
      findByUid: vi.fn(),
      findByUniversityEmail: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    }
  };
});

describe("UserService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getUserById", () => {
    it("should return a user if found", async () => {
      const mockUser = { id: "1", uid: "uid123", email: "test@edu" };
      vi.mocked(userRepository.findById).mockResolvedValue(mockUser as any);

      const result = await UserService.getUserById("1");
      expect(result).toEqual(mockUser);
      expect(userRepository.findById).toHaveBeenCalledWith("1");
    });

    it("should throw ApiError if user not found", async () => {
      vi.mocked(userRepository.findById).mockResolvedValue(null);

      await expect(UserService.getUserById("1")).rejects.toThrow("User not found");
    });
  });

  describe("createUser", () => {
    it("should create user if uid does not exist", async () => {
      const newUserData = { uid: "uid123", email: "test@edu", displayName: "Test", role: "STUDENT", verificationStatus: "unverified", universityName: "Test", universityEmail: "test@edu" } as any;
      const createdUser = { id: "uid123", ...newUserData };
      
      vi.mocked(userRepository.findByUid).mockResolvedValue(null);
      vi.mocked(userRepository.create).mockResolvedValue(createdUser);

      const result = await UserService.createUser(newUserData);
      expect(result).toEqual(createdUser);
      expect(userRepository.create).toHaveBeenCalledWith(newUserData, "uid123");
    });

    it("should throw ApiError if uid already exists", async () => {
      vi.mocked(userRepository.findByUid).mockResolvedValue({ id: "1" } as any);

      await expect(UserService.createUser({ uid: "uid123" } as any)).rejects.toThrow("User with this UID already exists");
    });
  });
});
