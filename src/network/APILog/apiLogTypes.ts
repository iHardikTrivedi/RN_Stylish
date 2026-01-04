export enum ApiLogIcon {
  Request = "➡️",
  Response = "✅",
  Error = "❌",
  Url = "🌐",
  Method = "🔧",
  Headers = "🧾",
  Params = "📤",
  Body = "📦",
  Status = "📶",
  Time = "⏱️",
  Trace = "🧵",
}

export enum ApiLogTag {
  API = "API",
}

export type ApiLogLevel = "debug" | "info" | "warn" | "error";

export type ApiLogConfig = {
  enabled: boolean;
  level: ApiLogLevel;
  maskKeys: string[];
  maxBodyLength: number;
  prettyJson: boolean;
};

export const DefaultApiLogConfig: ApiLogConfig = {
  enabled: true,
  level: "debug",
  maskKeys: [
    "authorization",
    "token",
    "access_token",
    "refresh_token",
    "password",
    "apikey",
    "api_key",
  ],
  maxBodyLength: 3000,
  prettyJson: true,
};
