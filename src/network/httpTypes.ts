export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiRequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeoutMs?: number;
  withAuth?: boolean;
  requestId?: string;
};

export type ApiResponse<T> = {
  data: T;
  status: number;
  headers: Record<string, any>;
};
