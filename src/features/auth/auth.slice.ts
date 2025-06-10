import { clearAuthState, loadAuthState, saveAuthState } from "@/lib/storage";
import { AuthResponse } from "@/lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface AuthPayload {
  userName: string;
  token: string;
  refreshToken: string;
  expiration: string;
}

type AuthInitialStateType = {
  email: string | null;
  password: string | null;
  isVerified: boolean | null;
  isKycCompleted: boolean | null;
};

const authInitialState: AuthInitialStateType = {
  email: null,
  password: null,
  isVerified: null,
  isKycCompleted: null,
};

const initialState = {
  ...loadAuthState(),
  ...authInitialState,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      const { userName, token, refreshToken, expiration } = action.payload;
      const expiresAt = Date.now() + parseInt(expiration) * 1000;

      state.user = userName;
      state.token = token;
      state.refreshToken = refreshToken;
      state.expiresAt = expiresAt;

      saveAuthState({ ...state, expiresAt });
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
      const { email, password, isVerified, isKycCompleted } = action.payload;
      if (email !== undefined) state.email = email;
      if (password !== undefined) state.password = password;
      if (isVerified !== undefined) state.isVerified = isVerified;
      if (isKycCompleted !== undefined) state.isKycCompleted = isKycCompleted;
    },

    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.expiresAt = null;

      clearAuthState();
    },
  },
});

export const { setCredentials, logOut, setAuthDetails } = authSlice.actions;

const selectCurrentUser = (state: RootState) => state.auth.user;
const selectCurrentToken = (state: RootState) => state.auth.token;
const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken;
const selectTokenExpiration = (state: RootState) => state.auth.expiresAt;
const selectIsAuthenticated = (state: RootState) => {
  const { token, expiresAt } = state.auth;
  return !!token && !!expiresAt && expiresAt > Date.now();
};

const selectAuthEmail = (state: RootState) => state.auth.email;
const selectAuthPassword = (state: RootState) => state.auth.password;
const selectIsAuthVerified = (state: RootState) => state.auth.isVerified;
const selectIsAuthKycCompleted = (state: RootState) =>
  state.auth.isKycCompleted;

export {
  selectAuthEmail,
  selectAuthPassword,
  selectCurrentRefreshToken,
  selectCurrentToken,
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsAuthKycCompleted,
  selectIsAuthVerified,
  selectTokenExpiration,
};
export default authSlice.reducer;
