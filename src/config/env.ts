export type AppEnvName = "DEV" | "SIT" | "UAT" | "PROD";

type EnvConfig = {
  name: AppEnvName;
  baseURL: string;
  timeoutMs: number;
};

const ENVS: Record<AppEnvName, EnvConfig> = {
  DEV: {
    name: "DEV",
    baseURL: "https://dev.demo.xyz/api/",
    timeoutMs: 20000,
  },
  SIT: {
    name: "SIT",
    baseURL: "http://sit.demo.xyz/api",
    timeoutMs: 20000,
  },
  UAT: {
    name: "UAT",
    baseURL: "https://uat.demo.xyz/api",
    timeoutMs: 20000,
  },
  PROD: {
    name: "PROD",
    baseURL: "https://demo.xyz/api",
    timeoutMs: 20000,
  },
};

const CURRENT: AppEnvName = "DEV";
export const Env = ENVS[CURRENT];