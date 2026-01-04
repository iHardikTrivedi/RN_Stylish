import axios, { AxiosInstance } from "axios";
import { Env } from "../config/env";
import { ApiRequestConfig, HttpMethod } from "./httpTypes";
import { buildHeaders } from "./requestBuilder";
import { toNetworkError } from "./networkError";
import { attachApiLogger } from "./APILog/apiLoggerAxios";
import { ApiLogger } from "./APILog/apiLogger";

ApiLogger.setConfig({
  enabled: __DEV__, // turn OFF in prod
  level: "debug",
  prettyJson: true,
});

const client: AxiosInstance = axios.create({
  baseURL: Env.baseURL,
  timeout: Env.timeoutMs,
});

attachApiLogger(client);

export async function apiRequest<TResponse, TBody = unknown>(
  url: string,
  method: HttpMethod,
  body?: TBody,
  cfg?: ApiRequestConfig
): Promise<TResponse> {
  try {
    const headers = await buildHeaders(cfg);

    const res = await client.request<TResponse>({
      url,
      method,
      data: body,
      params: cfg?.params,
      headers,
      timeout: cfg?.timeoutMs ?? Env.timeoutMs,
    });

    return res.data;
  } catch (e) {
    throw toNetworkError(e);
  }
}

export const ApiClient = {
  get: <T>(url: string, cfg?: ApiRequestConfig) => apiRequest<T>(url, "GET", undefined, cfg),
  post: <T, B>(url: string, body: B, cfg?: ApiRequestConfig) => apiRequest<T, B>(url, "POST", body, cfg),
  put: <T, B>(url: string, body: B, cfg?: ApiRequestConfig) => apiRequest<T, B>(url, "PUT", body, cfg),
  patch: <T, B>(url: string, body: B, cfg?: ApiRequestConfig) => apiRequest<T, B>(url, "PATCH", body, cfg),
  delete: <T>(url: string, cfg?: ApiRequestConfig) => apiRequest<T>(url, "DELETE", undefined, cfg),
};
