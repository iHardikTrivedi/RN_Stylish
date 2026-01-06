import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth_token";
let memoryToken: string | null = null;

export const tokenProvider = {
  async setToken(token: string | null) {
    if (!token) return;

    memoryToken = token;
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  async loadToken(): Promise<string | null> {
    if (memoryToken) return memoryToken;
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    memoryToken = token;
    return token;
  },

  async clearToken() {
    memoryToken = null;
    await AsyncStorage.removeItem(TOKEN_KEY);
  },

  getTokenSync() {
    return memoryToken;
  },
};
