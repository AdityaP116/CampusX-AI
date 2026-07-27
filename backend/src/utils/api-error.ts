export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors: unknown[] | null;

  constructor(
    statusCode: number,
    message: string,
    errors: unknown[] | null = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  public static badRequest(message: string, errors: unknown[] | null = null): ApiError {
    return new ApiError(400, message, errors);
  }

  public static unauthorized(message = "Unauthorized access"): ApiError {
    return new ApiError(401, message);
  }

  public static forbidden(message = "Access forbidden"): ApiError {
    return new ApiError(403, message);
  }

  public static notFound(message = "Resource not found"): ApiError {
    return new ApiError(404, message);
  }

  public static conflict(message: string, errors: unknown[] | null = null): ApiError {
    return new ApiError(409, message, errors);
  }

  public static internal(message = "Internal server error"): ApiError {
    return new ApiError(500, message);
  }
}
