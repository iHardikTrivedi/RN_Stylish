import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "./store";
import {
  authStart,
  authSuccess,
  authError,
  setToken,
  logout,
} from "./authSlice";

/**
 * LOGIN
 */
export const login = (emailOrUserName: string, password: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(authStart());

    try {
      // ✅ Replace with real API later
      if (!emailOrUserName || password.length < 6) {
        throw new Error("Invalid credentials");
      }

      const token = "dummy_token";
      await AsyncStorage.setItem("token", token);

      dispatch(authSuccess(token));
    } catch (e: any) {
      dispatch(authError(e?.message ?? "Login failed"));
    }
  };

/**
 * SIGNUP
 */
export const signup =
  (emailOrUserName: string, password: string) =>
    async (dispatch: AppDispatch) => {
      dispatch(authStart());

      try {
        const token = "dummy_token";
        await AsyncStorage.setItem("token", token);

        dispatch(authSuccess(token));
      } catch (e: any) {
        dispatch(authError(e?.message ?? "Signup failed"));
      }
    };

/**
 * LOAD TOKEN ON APP START
 */
export const loadToken = () => async (dispatch: AppDispatch) => {
  const token = await AsyncStorage.getItem("token");
  dispatch(setToken(token));
};

/**
 * LOGOUT
 */
export const logoutUser = () => async (dispatch: AppDispatch) => {
  await AsyncStorage.setItem("showIntroAfterLogout", "1");
  await AsyncStorage.removeItem("token");
  dispatch(logout());
};
