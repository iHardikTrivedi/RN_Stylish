import { apiClient, withConfig } from "./apiClient";
import { ApiRequestConfig, ApiResponse, HttpMethod } from "./httpTypes";

type RequestArgs = {
  method: HttpMethod;
  url: string;
  data?: unknown; // body
  config?: ApiRequestConfig;
};

export const request = async <T>(args: RequestArgs): Promise<ApiResponse<T>> => {
  const { method, url, data, config } = args;

  const axiosConfig = await withConfig(config);

  const res = await apiClient.request<T>({
    method,
    url,
    data,
    ...axiosConfig,
  });

  return {
    data: res.data,
    status: res.status,
    headers: res.headers as any,
  };
};

// Convenience methods
export const get = <T>(url: string, config?: ApiRequestConfig) =>
  request<T>({ method: "GET", url, config });

export const post = <T>(url: string, data?: unknown, config?: ApiRequestConfig) =>
  request<T>({ method: "POST", url, data, config });

export const put = <T>(url: string, data?: unknown, config?: ApiRequestConfig) =>
  request<T>({ method: "PUT", url, data, config });

export const patch = <T>(url: string, data?: unknown, config?: ApiRequestConfig) =>
  request<T>({ method: "PATCH", url, data, config });

export const del = <T>(url: string, config?: ApiRequestConfig) =>
  request<T>({ method: "DELETE", url, config });
