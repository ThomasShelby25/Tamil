export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
  timestamp: string;
}

export const createSuccessResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
  timestamp: new Date().toISOString(),
});

export const createErrorResponse = (
  error: string,
  errors?: Array<{ field: string; message: string }>
): ApiResponse => ({
  success: false,
  error,
  errors,
  timestamp: new Date().toISOString(),
});
