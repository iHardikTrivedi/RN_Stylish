import { Env } from "../../config/env";
import { LogTag } from "./logTag";
import { LogTagIcon } from "./logIcons";

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

type LogWriteInput = {
  level: LogLevel;
  tag: LogTag;
  message: string;
  data?: unknown;
  error?: unknown;
};

const levelOrder: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  fatal: 50,
};

// Default behavior by env (you can tweak anytime)
const defaultMinLevel: LogLevel =
  Env.name === "PROD" ? "warn" : Env.name === "QA" ? "info" : "debug";

export class AppLogger {
  // Turn logs on/off globally (Env.enableLogs can still control initial value)
  private static enabled = Env.enableLogs;

  // Minimum level to print (debug/info/warn/error/fatal)
  private static minLevel: LogLevel = defaultMinLevel;

  // Optional: add a global context that will be printed in every log
  // e.g. sessionId, userId, buildNumber, etc.
  private static globalContext: Record<string, unknown> = {};

  // ---------------------------
  // Public controls
  // ---------------------------

  static setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  static setMinLevel(level: LogLevel) {
    this.minLevel = level;
  }

  static setGlobalContext(ctx: Record<string, unknown>) {
    this.globalContext = { ...this.globalContext, ...ctx };
  }

  static clearGlobalContext() {
    this.globalContext = {};
  }

  // ---------------------------
  // Public logging API
  // ---------------------------

  static debug(message: string, data?: unknown, tag: LogTag = LogTag.APP) {
    this.write({ level: "debug", tag, message, data });
  }

  static info(message: string, data?: unknown, tag: LogTag = LogTag.APP) {
    this.write({ level: "info", tag, message, data });
  }

  static warn(message: string, data?: unknown, tag: LogTag = LogTag.APP) {
    this.write({ level: "warn", tag, message, data });
  }

  static error(
    message: string,
    error?: unknown,
    data?: unknown,
    tag: LogTag = LogTag.APP
  ) {
    this.write({ level: "error", tag, message, data, error });
    // ✅ Later: send to Sentry/Crashlytics here
    // this.reportError(message, error, data, tag);
  }

  static fatal(
    message: string,
    error?: unknown,
    data?: unknown,
    tag: LogTag = LogTag.APP
  ) {
    this.write({ level: "fatal", tag, message, data, error });
    // ✅ Later: send to Sentry/Crashlytics and flush immediately
    // this.reportFatal(message, error, data, tag);
  }

  // ---------------------------
  // Specialized helpers (optional but useful)
  // ---------------------------

  /** Measure duration of a block (like iOS signposts) */
  static time(label: string, tag: LogTag = LogTag.PERF) {
    const start = Date.now();
    this.debug(`⏳ START: ${label}`, undefined, tag);

    return {
      end: (data?: unknown) => {
        const ms = Date.now() - start;
        this.info(`✅ END: ${label}`, { ms, ...(data as any) }, tag);
        return ms;
      },
    };
  }

  /** Network-style logging (useful even without axios interceptors) */
  static apiRequest(args: {
    method: string;
    url: string;
    baseUrl?: string;
    headers?: unknown;
    params?: unknown;
    body?: unknown;
  }) {
    const { method, url, baseUrl, headers, params, body } = args;

    this.info(
      `API REQUEST ${method.toUpperCase()} ${url}`,
      {
        env: Env.name,
        baseUrl: baseUrl ?? Env.baseUrl,
        url,
        method: method.toUpperCase(),
        headers: this.maskSecrets(headers),
        params: this.maskSecrets(params),
        body: this.maskSecrets(body),
      },
      LogTag.API
    );
  }

  static apiResponse(args: { url: string; status: number; data?: unknown }) {
    const { url, status, data } = args;

    this.info(
      `API RESPONSE ${status} ${url}`,
      { url, status, data: this.maskSecrets(data) },
      LogTag.API
    );
  }

  static apiError(args: { url: string; error: unknown; status?: number }) {
    const { url, error, status } = args;

    this.error(
      `API ERROR ${status ?? ""} ${url}`.trim(),
      error,
      { url, status },
      LogTag.API
    );
  }

  // ---------------------------
  // Core writer
  // ---------------------------

  private static canLog(level: LogLevel) {
    if (!this.enabled) return false;
    return levelOrder[level] >= levelOrder[this.minLevel];
  }

  private static timestamp() {
    return new Date().toISOString();
  }

  private static prefix(level: LogLevel, tag: LogTag) {
    const icon = LogTagIcon[tag] ?? "📌";
    return `[${this.timestamp()}] [${Env.name}] ${icon} [${tag}] [${level.toUpperCase()}]`;
  }

  private static safeStringify(value: unknown) {
    try {
      if (value === undefined) return undefined;
      if (typeof value === "string") return value;
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }

  private static normalizeError(err: unknown) {
    if (!err) return undefined;

    if (err instanceof Error) {
      return {
        name: err.name,
        message: err.message,
        stack: err.stack,
      };
    }

    // axios/fetch-like error shapes
    const anyErr: any = err;
    if (anyErr?.message || anyErr?.stack) {
      return {
        message: anyErr.message,
        stack: anyErr.stack,
        ...("code" in anyErr ? { code: anyErr.code } : {}),
      };
    }

    return err;
  }

  private static write(input: LogWriteInput) {
    const { level, tag, message, data, error } = input;

    if (!this.canLog(level)) return;

    const head = `${this.prefix(level, tag)} → ${message}`;

    const mergedData =
      data === undefined && Object.keys(this.globalContext).length === 0
        ? undefined
        : {
          ...this.globalContext,
          ...(data !== undefined ? { data } : {}),
        };

    const normalizedError = error ? this.normalizeError(error) : undefined;

    // 🚫 Avoid noisy console in PROD unless warn/error/fatal
    // (already controlled by minLevel, but this is extra safe)
    if (Env.name === "PROD" && levelOrder[level] < levelOrder[this.minLevel]) {
      return;
    }

    if (level === "error" || level === "fatal") {
      console.error(head);
      if (mergedData !== undefined)
        console.error("payload:", this.safeStringify(this.maskSecrets(mergedData)));
      if (normalizedError !== undefined)
        console.error("error:", this.safeStringify(this.maskSecrets(normalizedError)));
      return;
    }

    if (level === "warn") {
      console.warn(head);
      if (mergedData !== undefined)
        console.warn("payload:", this.safeStringify(this.maskSecrets(mergedData)));
      return;
    }

    // debug/info
    console.log(head);
    if (mergedData !== undefined)
      console.log("payload:", this.safeStringify(this.maskSecrets(mergedData)));
  }

  // ---------------------------
  // Secret masking (VERY important for logs)
  // ---------------------------

  // Keys to mask anywhere in objects
  private static secretKeys = new Set([
    "password",
    "pass",
    "token",
    "accessToken",
    "refreshToken",
    "authorization",
    "apiKey",
    "apikey",
    "secret",
    "clientSecret",
    "otp",
    "pin",
  ]);

  private static maskValue(value: unknown) {
    if (value === null || value === undefined) return value;
    if (typeof value === "string") {
      // show last 4 chars for debugging, mask rest
      if (value.length <= 6) return "***";
      return `${"*".repeat(Math.max(0, value.length - 4))}${value.slice(-4)}`;
    }
    return "***";
  }

  private static maskSecrets(input: unknown): unknown {
    if (input === null || input === undefined) return input;

    if (Array.isArray(input)) {
      return input.map((x) => this.maskSecrets(x));
    }

    if (typeof input === "object") {
      const obj = input as Record<string, unknown>;
      const out: Record<string, unknown> = {};

      for (const key of Object.keys(obj)) {
        const val = obj[key];
        if (this.secretKeys.has(key.toLowerCase())) {
          out[key] = this.maskValue(val);
        } else {
          out[key] = this.maskSecrets(val);
        }
      }
      return out;
    }

    return input;
  }
}