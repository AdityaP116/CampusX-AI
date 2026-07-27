import { describe, it, expect } from "vitest";
import { ApiResponse } from "../utils/response.util";

describe("Health Check Unit Test", () => {
  it("should generate standardized success response", () => {
    const response = ApiResponse.success("CampusX API is healthy", { status: "UP" });
    expect(response.success).toBe(true);
    expect(response.message).toBe("CampusX API is healthy");
    expect(response.data).toEqual({ status: "UP" });
  });

  it("should generate standardized error response", () => {
    const response = ApiResponse.error("Something went wrong", ["Invalid param"]);
    expect(response.success).toBe(false);
    expect(response.message).toBe("Something went wrong");
    expect(response.errors).toEqual(["Invalid param"]);
  });
});
