import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "./store";
import {
  authStart,
  authSuccess,
  authError,
  logout,
} from "./authSlice";
import { tokenProvider } from "../network/tokenProvider";
import { isNetworkError, NetworkError } from "../network/networkError";
import { AuthApi } from "../api/auth/auth.api";
import { LoginInput } from "../api/auth/auth.types";

import axios from "axios";

export const getErrorMessage = (e: unknown): string => {
  // 1️⃣ NetworkError created by toNetworkError
  if (typeof e === "object" && e !== null && "details" in e) {
    const ne = e as NetworkError;
    const d: any = ne.details;

    return (
      d?.response?.message?.description ||
      d?.response?.message?.title ||
      d?.message?.description ||
      d?.message?.title ||
      ne.message ||
      "Something went wrong"
    );
  }

  // 2️⃣ Raw AxiosError (fallback safety)
  if (axios.isAxiosError(e)) {
    const d: any = e.response?.data;
    return (
      d?.response?.message?.description ||
      d?.response?.message?.title ||
      e.message ||
      "Request failed"
    );
  }

  // 3️⃣ Normal Error
  if (e instanceof Error) return e.message;

  return "Something went wrong";
};

export const loadToken = () => async (dispatch: AppDispatch) => {
  dispatch(authStart());

  try {
    const token = await tokenProvider.loadToken();
    if (token) dispatch(authSuccess(token));
    else dispatch(logout());
  } catch {
    dispatch(logout());
  }
};

export const login =
  (body: LoginInput) => async (dispatch: AppDispatch) => {
    dispatch(authStart());

    try {
      const res = await AuthApi.login(body);

      if (!res.data?.status) {
        dispatch(authError(res.data?.message?.description || "Login failed"));
        return;
      }

      const token = res.data.data.token;
      await tokenProvider.setToken(token);
      dispatch(authSuccess(token));
    } catch (e) {
      // ✅ NetworkError message already contains server message now
      const msg = isNetworkError(e) ? e.message : (e as any)?.message || "Login failed";
      dispatch(authError(msg));
    }
  };

export const signup =
  (emailOrUserName: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(authStart());
    try {
      const res = await AuthApi.register({ email: emailOrUserName, password });
      await tokenProvider.setToken(res.token);
      dispatch(authSuccess(res.token));
    } catch (e) {
      dispatch(authError(getErrorMessage(e) || "Signup failed"));
    }
  };

export const logoutUser = () => async (dispatch: AppDispatch) => {
  await AsyncStorage.setItem("showIntroAfterLogout", "1");
  await tokenProvider.clearToken();
  dispatch(logout());
};