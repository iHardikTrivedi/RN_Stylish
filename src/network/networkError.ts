export type NetworkErrorKind =
  | "Timeout"
  | "NoInternet"
  | "Cancelled"
  | "HttpError"
  | "DecodeError"
  | "Unknown";

export class NetworkError extends Error {
  kind: NetworkErrorKind;
  status?: number;
  url?: string;
  payload?: unknown;

  constructor(
    message: string,
    kind: NetworkErrorKind = "Unknown",
    opts?: { status?: number; url?: string; payload?: unknown }
  ) {
    super(message);
    this.name = "NetworkError";
    this.kind = kind;
    this.status = opts?.status;
    this.url = opts?.url;
    this.payload = opts?.payload;
  }
}

export const toNetworkError = (err: any, url?: string): NetworkError => {
  // Axios cancel
  if (err?.code === "ERR_CANCELED") {
    return new NetworkError("Request cancelled", "Cancelled", { url });
  }

  // Axios timeout
  if (err?.code === "ECONNABORTED" || /timeout/i.test(err?.message ?? "")) {
    return new NetworkError("Request timeout", "Timeout", { url });
  }

  // HTTP error
  const status = err?.response?.status;
  if (typeof status === "number") {
    return new NetworkError(`HTTP ${status}`, "HttpError", {
      status,
      url,
      payload: err?.response?.data,
    });
  }

  // Network offline often appears as "Network Error" in axios
  if (/network error/i.test(err?.message ?? "")) {
    return new NetworkError("No internet connection", "NoInternet", { url });
  }

  return new NetworkError(err?.message ?? "Unknown error", "Unknown", { url });
};