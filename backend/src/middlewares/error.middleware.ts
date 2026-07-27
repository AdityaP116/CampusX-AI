import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/response.util";
import { logger } from "../utils/logger";

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(err, err.message);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json(ApiResponse.error(err.message, err.errors));
    return;
  }

  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    res
      .status(400)
      .json(ApiResponse.error("Validation failed", formattedErrors));
    return;
  }

  // Handle generic unhandled errors
  const isProduction = process.env.NODE_ENV === "production";
  const message = isProduction
    ? "Internal Server Error"
    : err.message || "An unexpected error occurred";
  const errors = isProduction ? null : [err.stack];

  res.status(500).json(ApiResponse.error(message, errors));
};
