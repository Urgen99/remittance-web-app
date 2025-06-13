import { clearAuthState, loadAuthState, saveAuthState } from "@/lib/storage";
import { AuthResponse } from "@/lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AuthInitialStateType = {
  email: string | null;
  user: string | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  password: string | null;
};

const authInitialState: AuthInitialStateType = {
  email: null,
  password: null,
  user: null,
  token: null,
  refreshToken: null,
  expiresAt: null,
};

const initialState: AuthInitialStateType = {
  ...authInitialState,
  ...loadAuthState(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      const { userName, token, refreshToken, expiration } = action.payload;
      const expiresAt = Date.now() + parseInt(expiration) * 1000; // 3600 expiration = 1 hour

      state.user = userName;
      state.token = token;
      state.refreshToken = refreshToken;
      state.expiresAt = expiresAt;

      saveAuthState({ refreshToken, expiresAt, token, user: userName });
    },

    setAuthDetails: (
      state,
      action: PayloadAction<
        Partial<{
          email?: string;
          password?: string;
          isVerified?: boolean;
          isKycCompleted?: boolean;
        }>
      >
    ) => {
      const { email, password } = action.payload;
      if (email !== undefined) state.email = email;
      if (password !== undefined) state.password = password;
    },

    logOut: (state) => {
      Object.assign(state, authInitialState);
      clearAuthState();
    },
  },
});

export const { setCredentials, logOut, setAuthDetails } = authSlice.actions;

/* ---------- AUTH DETAILS SELECTORS ---------- */
const selectAuthEmail = (state: RootState) => state.auth.email;
const selectAuthPassword = (state: RootState) => state.auth.password;

/* ---------- CURRENT USER SELECTORS ---------- */
const selectCurrentUser = (state: RootState) => state.auth.user;
const selectCurrentToken = (state: RootState) => state.auth.token;
const selectCurrentExpiry = (state: RootState) => state.auth.expiresAt;

export {
  selectAuthEmail,
  selectAuthPassword,
  selectCurrentExpiry,
  selectCurrentToken,
  selectCurrentUser,
};
export default authSlice.reducer;
