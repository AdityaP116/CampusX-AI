import { describe, it, expect } from "vitest";
import { authValidators, productValidators, chatValidators } from "../../src/validators";

describe("Validation Schemas & API Contract Suite", () => {
  describe("authValidators.sendOtp", () => {
    it("should accept valid institutional email addresses (.edu, .ac.in, nhitm.ac.in)", () => {
      const validCases = [
        { universityEmail: "student@harvard.edu" },
        { universityEmail: "scholar@iitb.ac.in" },
        { universityEmail: "student@nhitm.ac.in" },
      ];

      for (const validCase of validCases) {
        const result = authValidators.sendOtp.safeParse({ body: validCase });
        expect(result.success).toBe(true);
      }
    });

    it("should reject non-institutional generic public emails", () => {
      const invalidCases = [
        { universityEmail: "attacker@gmail.com" },
        { universityEmail: "scammer@yahoo.com" },
        { universityEmail: "invalid-email" },
      ];

      for (const invalidCase of invalidCases) {
        const result = authValidators.sendOtp.safeParse({ body: invalidCase });
        expect(result.success).toBe(false);
      }
    });
  });

  describe("authValidators.verifyOtp", () => {
    it("should accept exactly 6-digit numeric OTPs", () => {
      const result = authValidators.verifyOtp.safeParse({
        body: { universityEmail: "test@nhitm.ac.in", otp: "123456" },
      });
      expect(result.success).toBe(true);
    });

    it("should reject invalid length or malformed OTPs", () => {
      const shortOtp = authValidators.verifyOtp.safeParse({
        body: { universityEmail: "test@nhitm.ac.in", otp: "123" },
      });
      const longOtp = authValidators.verifyOtp.safeParse({
        body: { universityEmail: "test@nhitm.ac.in", otp: "1234567" },
      });
      expect(shortOtp.success).toBe(false);
      expect(longOtp.success).toBe(false);
    });
  });

  describe("productValidators.create", () => {
    it("should validate and sanitize compliant marketplace product listing payloads", () => {
      const validListing = {
        title: "Calculus Early Transcendentals 8th Edition",
        description: "Hardcover textbook in near mint condition. Clean pages with no highlights.",
        price: 45.0,
        transactionType: "SELL",
        condition: "like_new",
        category: "textbooks",
        images: ["https://example.com/item1.jpg"],
        location: "Engineering Library",
      };

      const result = productValidators.create.safeParse({ body: validListing });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.body.condition).toBe("like_new");
        expect(result.data.body.transactionType).toBe("SELL");
      }
    });

    it("should normalize 'like-new' hyphenated condition to enum 'like_new'", () => {
      const listing = {
        title: "Scientific Calculator TI-84 Plus",
        description: "Standard graphing calculator for exams and lab work.",
        price: 70,
        condition: "like-new",
      };

      const result = productValidators.create.safeParse({ body: listing });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.body.condition).toBe("like_new");
      }
    });

    it("should reject negative prices and descriptions below 10 characters", () => {
      const negativePrice = productValidators.create.safeParse({
        body: {
          title: "MacBook Air M2",
          description: "Clean laptop with charger",
          price: -50,
          condition: "good",
        },
      });
      const shortDesc = productValidators.create.safeParse({
        body: {
          title: "MacBook Air M2",
          description: "Short",
          price: 500,
          condition: "good",
        },
      });

      expect(negativePrice.success).toBe(false);
      expect(shortDesc.success).toBe(false);
    });
  });

  describe("chatValidators.sendMessage", () => {
    it("should accept valid non-empty message payloads with ID param", () => {
      const result = chatValidators.sendMessage.safeParse({
        params: { id: "conv-12345" },
        body: { content: "Hi! Is this textbook still available?" },
      });
      expect(result.success).toBe(true);
    });

    it("should reject empty message content", () => {
      const result = chatValidators.sendMessage.safeParse({
        params: { id: "conv-12345" },
        body: { content: "" },
      });
      expect(result.success).toBe(false);
    });
  });
});
