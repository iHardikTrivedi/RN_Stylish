export type AppEnvName = "DEV" | "QA" | "PROD";

type EnvConfig = {
  name: AppEnvName;
  baseURL: string;
  timeoutMs: number;
};

const ENVS: Record<AppEnvName, EnvConfig> = {
  DEV: {
    name: "DEV",
    baseURL: "https://reqres.in/api",
    timeoutMs: 20000,
  },
  QA: {
    name: "QA",
    baseURL: "https://reqres.in/api",
    timeoutMs: 20000,
  },
  PROD: {
    name: "PROD",
    baseURL: "https://reqres.in/api",
    timeoutMs: 20000,
  },
};

// Simple runtime env switch
const CURRENT: AppEnvName = "DEV";

export const Env = ENVS[CURRENT];