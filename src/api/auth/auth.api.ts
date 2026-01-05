import { ApiClient } from "../../network/apiClient";
import { Endpoints } from "../endpoints";
import type {
  LoginInput,
  LoginBody,
  RegisterBody,
  RegisterResponse,
  ForgotPasswordBody,
  ForgotPasswordResponse,
  LoginResponse,
} from "./auth.types";

export const AuthApi = {
  login: (input: LoginInput) => {
    const body: LoginBody = {
      ...input,
      country_code: "+91",
      type: "phone_no",
      auth_type: "password",
      device: "IOS",
    };

    return ApiClient.post<LoginResponse, LoginBody>(
      Endpoints.auth.login(),
      body,
      { withAuth: false }
    );
  },

  register: (body: RegisterBody) =>
    ApiClient.post<RegisterResponse, RegisterBody>(
      Endpoints.auth.register(),
      body,
      { withAuth: false }
    ),

  forgotPassword: (body: ForgotPasswordBody) =>
    ApiClient.post<ForgotPasswordResponse, ForgotPasswordBody>(
      Endpoints.auth.forgotPassword(),
      body,
      { withAuth: false }
    ),
};
