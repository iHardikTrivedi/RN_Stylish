import type { AxiosError } from "axios";

export type NetworkErrorType =
  | "CANCELLED"
  | "TIMEOUT"
  | "NO_INTERNET"
  | "HTTP_ERROR"
  | "DECODE_ERROR"
  | "UNKNOWN";

export type NetworkError = {
  type: NetworkErrorType;
  message: string;
  status?: number;
  details?: any;
};

export const toNetworkError = (e: unknown): NetworkError => {
  // Axios
  const ax = e as AxiosError<any>;

  if (ax?.isAxiosError) {
    const status = ax.response?.status;

    // Axios timeout uses code = 'ECONNABORTED'
    if (ax.code === "ECONNABORTED") {
      return { type: "TIMEOUT", message: "Request timeout", status, details: ax.response?.data };
    }

    // Cancelled request
    if (ax.code === "ERR_CANCELED") {
      return { type: "CANCELLED", message: "Request cancelled", status };
    }

    // Network error (no response)
    if (!ax.response) {
      return { type: "NO_INTERNET", message: ax.message || "Network error" };
    }

    return {
      type: "HTTP_ERROR",
      message: ax.message || "HTTP error",
      status,
      details: ax.response?.data,
    };
  }

  // Non-axios
  const msg = e instanceof Error ? e.message : "Unknown error";
  return { type: "UNKNOWN", message: msg, details: e };
};