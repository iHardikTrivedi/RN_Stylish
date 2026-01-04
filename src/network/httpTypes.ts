export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiRequestConfig = {
  withAuth?: boolean;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeoutMs?: number;
};
