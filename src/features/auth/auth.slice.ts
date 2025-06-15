import { clearAuthState, loadAuthState, saveAuthState } from "@/lib/storage";
import { AuthResponse } from "@/lib/type";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AuthInitialStateType = {
  email: string | null;
  user: string | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  password: string | null;
  isVerified: boolean | null;
  isKycCompleted: boolean | null;
};

const authInitialState: AuthInitialStateType = {
  email: null,
  password: null,
  user: null,
  token: null,
  refreshToken: null,
  expiresAt: null,
  isVerified: null,
  isKycCompleted: null,
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
      const {
        userName,
        token,
        refreshToken,
        expiration,
        isVerified,
        isKycCompleted,
      } = action.payload;
      const expiresAt = Date.now() + parseInt(expiration) * 1000; // 3600 expiration = 1 hour

      state.user = userName;
      state.token = token;
      state.refreshToken = refreshToken;
      state.expiresAt = expiresAt;
      state.isVerified = isVerified;
      state.isKycCompleted = isKycCompleted;

      saveAuthState({
        refreshToken,
        expiresAt,
        token,
        user: userName,
        isVerified,
        isKycCompleted,
      });
    },

    setAuthDetails: (
      state,
      action: PayloadAction<Partial<{ email?: string; password?: string }>>
    ) => {
      const { email, password } = action.payload;
      if (email !== undefined) state.email = email;
      if (password !== undefined) state.password = password;
    },

    logOut: (state) => {
      Object.assign(state, authInitialState);
      clearAuthState();
    },

    removeAuthDetails: (state) => {
      state.email = null;
      state.password = null;
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

const selectVerifiedUser = createSelector(
  [
    (state: RootState) => state.auth.isVerified,
    (state: RootState) => state.auth.isKycCompleted,
  ],
  (isVerified, isKycCompleted) => isVerified && isKycCompleted
);

export {
  selectAuthEmail,
  selectAuthPassword,
  selectCurrentExpiry,
  selectCurrentToken,
  selectCurrentUser,
  selectVerifiedUser,
};
export default authSlice.reducer;
