import axios from "axios";

export type NetworkError = Error & {
  kind: "NetworkError";
  status?: number;
  data?: any;
};

export function isNetworkError(e: unknown): e is NetworkError {
  return typeof e === "object" && e !== null && (e as any).kind === "NetworkError";
}

export function toNetworkError(err: unknown): NetworkError {
  // Default
  const out = new Error("Something went wrong") as NetworkError;
  out.kind = "NetworkError";

  if (axios.isAxiosError(err)) {
    out.status = err.response?.status;
    out.data = err.response?.data;

    const d: any = err.response?.data;

    // ✅ your backend message paths
    const serverMsg =
      d?.response?.message?.description ||
      d?.response?.message?.title ||
      d?.message?.description ||
      d?.message?.title;

    out.message = serverMsg || err.message || "Request failed";
    return out;
  }

  if (err instanceof Error) {
    out.message = err.message;
  }

  return out;
}
