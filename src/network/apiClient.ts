import axios, { AxiosError, AxiosInstance } from "axios";
import { Env } from "../config/env";
import { AppLogger } from "../utils/logger/logger";
import { LogTag } from "../utils/logger/logTag";
import { ApiRequestConfig } from "./httpTypes";
import { toNetworkError } from "./networkError";

// 🔐 Replace this later with your real token provider (Redux/Storage)
const tokenProvider = {
  async getToken(): Promise<string | null> {
    return null;
  },
};

const buildHeaders = async (cfg?: ApiRequestConfig) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(cfg?.headers ?? {}),
  };

  if (cfg?.withAuth) {
    const token = await tokenProvider.getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  if (cfg?.requestId) {
    headers["X-Request-Id"] = cfg.requestId;
  }

  return headers;
};

export const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: Env.baseUrl,
    timeout: Env.timeoutMs,
  });

  // Request logging
  instance.interceptors.request.use(
    (config) => {
      // axios may set url relative; keep both for clarity
      const url = config.url ?? "";
      const method = (config.method ?? "GET").toUpperCase();

      AppLogger.apiRequest({
        method,
        url,
        baseUrl: config.baseURL ?? Env.baseUrl,
        headers: config.headers,
        params: config.params,
        body: config.data,
      });

      return config;
    },
    (error) => {
      AppLogger.error("Request interceptor error", error, undefined, LogTag.API);
      return Promise.reject(error);
    }
  );

  // Response logging
  instance.interceptors.response.use(
    (response) => {
      AppLogger.apiResponse({
        url: response.config?.url ?? "",
        status: response.status,
        data: response.data,
      });
      return response;
    },
    (error: AxiosError) => {
      const url = (error.config?.url as string) ?? "Unknown URL";
      const status = error.response?.status;

      AppLogger.apiError({
        url,
        status,
        error: error.response?.data ?? error.message ?? error,
      });

      return Promise.reject(toNetworkError(error, url));
    }
  );

  return instance;
};

export const apiClient = createApiClient();

// Helper to attach headers per request (auth + requestId)
export const withConfig = async (cfg?: ApiRequestConfig) => {
  const headers = await buildHeaders(cfg);
  return {
    headers,
    params: cfg?.params,
    timeout: cfg?.timeoutMs,
  };
};
