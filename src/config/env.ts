export type AppEnv = "DEV" | "QA" | "PROD";

const ENV: AppEnv =
  (process.env.EXPO_PUBLIC_ENV as AppEnv) ?? "DEV";

const BASE_URLS: Record<AppEnv, string> = {
  DEV: "https://reqres.in/api",
  QA: "https://qa.api.yourapp.com",
  PROD: "https://api.yourapp.com",
};

export const Env = {
  name: ENV,
  baseUrl: BASE_URLS[ENV],
  timeoutMs: Number(process.env.EXPO_PUBLIC_API_TIMEOUT_MS ?? 20000),
  enableLogs: ENV !== "PROD",
};
