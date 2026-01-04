import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiLogger } from "./apiLogger";

export const attachApiLogger = (client: AxiosInstance) => {
  client.interceptors.request.use((config) => {
    const traceId = makeTraceId();
    (config as any).__traceId = traceId;
    (config as any).__startTs = Date.now();

    ApiLogger.request({
      url: buildUrl(config),
      method: config.method,
      headers: config.headers as any,
      params: config.params as any,
      body: config.data,
      traceId,
    });

    return config;
  });

  client.interceptors.response.use(
    (res: AxiosResponse) => {
      const meta = res.config as any;
      const traceId = meta.__traceId;
      const start = meta.__startTs ?? Date.now();
      const timeMs = Date.now() - start;

      ApiLogger.response({
        url: buildUrl(res.config),
        status: res.status,
        timeMs,
        response: res.data,
        traceId,
      });

      return res;
    },
    (err) => {
      const config: AxiosRequestConfig | undefined = err.config;
      const meta = (config as any) ?? {};
      const traceId = meta.__traceId;
      const start = meta.__startTs ?? Date.now();
      const timeMs = Date.now() - start;

      ApiLogger.error({
        url: config ? buildUrl(config) : undefined,
        status: err.response?.status,
        timeMs,
        traceId,
        message: err.message ?? "Unknown error",
        details: {
          response: err.response?.data,
          headers: err.response?.headers,
        },
      });

      return Promise.reject(err);
    }
  );
};

function buildUrl(config: AxiosRequestConfig) {
  const base = (config.baseURL ?? "").replace(/\/$/, "");
  const url = config.url ?? "";
  if (url.startsWith("http")) return url;
  return `${base}${url}`;
}

function makeTraceId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
