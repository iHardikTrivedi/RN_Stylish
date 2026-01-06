import { ApiLogConfig, ApiLogIcon, ApiLogTag, DefaultApiLogConfig } from "./apiLogTypes";

type AnyObj = Record<string, any>;

let cfg: ApiLogConfig = DefaultApiLogConfig;

export const ApiLogger = {
  setConfig(next: Partial<ApiLogConfig>) {
    cfg = { ...cfg, ...next };
  },

  request(data: {
    url: string;
    method?: string;
    headers?: AnyObj;
    params?: AnyObj;
    body?: any;
    traceId?: string;
  }) {
    if (!cfg.enabled) return;

    const lines: string[] = [];
    lines.push(`${ApiLogIcon.Request} [${ApiLogTag.API}] Request`);
    lines.push(`${ApiLogIcon.Url} URL: ${data.url}`);
    if (data.method) lines.push(`${ApiLogIcon.Method} Method: ${data.method.toUpperCase()}`);
    if (data.traceId) lines.push(`${ApiLogIcon.Trace} Trace: ${data.traceId}`);

    if (data.headers) lines.push(`${ApiLogIcon.Headers} Headers: ${trim(format(maskObject(data.headers)))}`);
    if (data.params) lines.push(`${ApiLogIcon.Params} Params: ${trim(format(maskObject(data.params)))}`);
    if (data.body !== undefined) lines.push(`${ApiLogIcon.Body} Body: ${trim(format(maskValue(data.body)))}`);

    print(lines.join("\n"));
  },

  response(data: {
    url: string;
    status?: number;
    timeMs?: number;
    response?: any;
    traceId?: string;
  }) {
    if (!cfg.enabled) return;

    const lines: string[] = [];
    lines.push(`${ApiLogIcon.Response} [${ApiLogTag.API}] Response`);
    lines.push(`${ApiLogIcon.Url} URL: ${data.url}`);
    if (data.traceId) lines.push(`${ApiLogIcon.Trace} Trace: ${data.traceId}`);
    if (data.status !== undefined) lines.push(`${ApiLogIcon.Status} Status: ${data.status}`);
    if (data.timeMs !== undefined) lines.push(`${ApiLogIcon.Time} Time: ${data.timeMs}ms`);

    if (data.response !== undefined) {
      lines.push(`${ApiLogIcon.Body} Body: ${trim(format(maskValue(data.response)))}`);
    }

    print(lines.join("\n"));
  },

  error(data: {
    url?: string;
    status?: number;
    timeMs?: number;
    message: string;
    details?: any;
    traceId?: string;
  }) {
    if (!cfg.enabled) return;

    const lines: string[] = [];
    lines.push(`${ApiLogIcon.Error} [${ApiLogTag.API}] Error`);
    if (data.url) lines.push(`${ApiLogIcon.Url} URL: ${data.url}`);
    if (data.traceId) lines.push(`${ApiLogIcon.Trace} Trace: ${data.traceId}`);
    if (data.status !== undefined) lines.push(`${ApiLogIcon.Status} Status: ${data.status}`);
    if (data.timeMs !== undefined) lines.push(`${ApiLogIcon.Time} Time: ${data.timeMs}ms`);
    lines.push(`🧨 Message: ${data.message}`);

    if (data.details !== undefined) {
      lines.push(`📄 Details: ${trim(format(maskValue(data.details)))}`);
    }

    // ✅ IMPORTANT:
    // React Native dev shows `console.error` as a RedBox (looks like crash).
    // So in DEV we log errors as `warn` to avoid blocking UI/alerts.
    const level: "warn" | "error" = __DEV__ ? "warn" : "error";
    print(lines.join("\n"), level);
  },
};

// ---------- helpers ----------
function print(msg: string, force?: "error" | "warn" | "info" | "debug") {
  const level = force ?? cfg.level;

  switch (level) {
    case "error":
      console.error(msg);
      break;
    case "warn":
      console.warn(msg);
      break;
    case "info":
      console.info(msg);
      break;
    default:
      console.log(msg);
  }
}

function format(value: any) {
  try {
    if (typeof value === "string") return value;

    // ✅ safe stringify (handles circular objects)
    const json = safeStringify(value, cfg.prettyJson ? 2 : 0);
    return json ?? String(value);
  } catch (e) {
    return `[Unserializable: ${String(e)}]`;
  }
}

/**
 * Safe JSON stringify that won't crash on circular references.
 * It replaces circular refs with "[Circular]".
 */
function safeStringify(value: any, space: number) {
  const seen = new WeakSet();

  return JSON.stringify(
    value,
    (_key, val) => {
      if (typeof val === "function") return "[Function]";

      if (val && typeof val === "object") {
        if (seen.has(val)) return "[Circular]";
        seen.add(val);

        // normalize Error objects
        if (val instanceof Error) {
          return { name: val.name, message: val.message, stack: val.stack };
        }
      }

      return val;
    },
    space
  );
}

function trim(str: string) {
  if (!str) return str;
  if (str.length <= cfg.maxBodyLength) return str;
  return str.slice(0, cfg.maxBodyLength) + "…(trimmed)";
}

function maskObject(obj: AnyObj): AnyObj {
  const out: AnyObj = Array.isArray(obj) ? [...obj] : { ...obj };

  for (const key of Object.keys(out)) {
    const v = out[key];
    if (cfg.maskKeys.includes(key.toLowerCase())) out[key] = "***";
    else if (v && typeof v === "object") out[key] = maskValue(v);
  }

  return out;
}

function maskValue(value: any): any {
  if (!value || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(maskValue);

  const out: AnyObj = { ...value };

  for (const key of Object.keys(out)) {
    const v = out[key];
    if (cfg.maskKeys.includes(key.toLowerCase())) out[key] = "***";
    else if (v && typeof v === "object") out[key] = maskValue(v);
  }

  return out;
}
