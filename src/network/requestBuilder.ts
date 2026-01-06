import { ApiRequestConfig } from "./httpTypes";
import { tokenProvider } from "./tokenProvider";

export const buildHeaders = async (cfg?: ApiRequestConfig) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(cfg?.headers ?? {}),
  };

  if (cfg?.withAuth) {
    const token = tokenProvider.getTokenSync();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};