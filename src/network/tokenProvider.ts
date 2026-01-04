import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../store/store";

const TOKEN_KEY = "token";

export const tokenProvider = {
  async getToken(): Promise<string | null> {
    try {
      const state = store.getState() as any;

      const reduxToken: string | null | undefined = state?.auth?.token;
      if (reduxToken) return reduxToken;

      const stored = await AsyncStorage.getItem(TOKEN_KEY);
      return stored;
    } catch {
      return await AsyncStorage.getItem(TOKEN_KEY);
    }
  },

  async setToken(token: string): Promise<void> {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  async clearToken(): Promise<void> {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },
};
