import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "./store";
import {
  authStart,
  authSuccess,
  authError,
  setToken,
  logout,
} from "./authSlice";
import { tokenProvider } from "../network/tokenProvider";
import { NetworkError } from "../network/networkError";
import { AuthApi } from "../api/auth/auth.api";
import { LoginInput } from "../api/auth/auth.types";

const getErrorMessage = (e: unknown) => {
  const ne = e as NetworkError;
  if (typeof ne?.details === "object") return ne.details?.message || ne.details?.error || ne.message;
  return ne?.message || "Something went wrong";
};

export const login =
  (body: LoginInput) => async (dispatch: AppDispatch) => {
    dispatch(authStart());
    try {
      const res = await AuthApi.login(body);
      await tokenProvider.setToken(res.data.token);
      dispatch(authSuccess(res.data.token));
    } catch (e) {
      dispatch(authError(getErrorMessage(e) || "Login failed"));
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