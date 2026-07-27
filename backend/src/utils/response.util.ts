export interface ISuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface IErrorResponse {
  success: false;
  message: string;
  errors: unknown[] | null;
}

export class ApiResponse {
  public static success<T>(
    message: string,
    data: T
  ): ISuccessResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  public static error(
    message: string,
    errors: unknown[] | null = null
  ): IErrorResponse {
    return {
      success: false,
      message,
      errors,
    };
  }
}
