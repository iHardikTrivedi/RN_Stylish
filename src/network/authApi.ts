import { apiClient, withConfig } from "./apiClient";
import { Endpoints } from "./endpoints";
import { ApiRequestConfig, ApiResponse } from "./httpTypes";
import { SignupRequest, SignupResponse } from "./types/authTypes";

export const AuthApi = {
  async register(
    payload: SignupRequest,
    cfg?: ApiRequestConfig
  ): Promise<ApiResponse<SignupResponse>> {
    const axiosCfg = await withConfig({
      ...cfg,
      withAuth: false,
    });

    const res = await apiClient.post<SignupResponse>(
      Endpoints.auth.register(),
      payload,
      axiosCfg
    );

    return {
      data: res.data,
      status: res.status,
      headers: res.headers as Record<string, any>,
    };
  },

  async login(
    payload: { username: string; password: string },
    cfg?: ApiRequestConfig
  ) {
    const axiosCfg = await withConfig({ ...cfg, withAuth: false });

    const res = await apiClient.post(
      Endpoints.auth.login(),
      payload,
      axiosCfg
    );

    return {
      data: res.data,
      status: res.status,
      headers: res.headers,
    };
  },
};
