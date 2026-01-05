import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.token = action.payload;
    },
    authError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authError,
  logout,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;