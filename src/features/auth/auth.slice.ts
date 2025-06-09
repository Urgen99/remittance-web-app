import { clearAuthState, loadAuthState } from "@/lib/storage";
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
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      const { userName, token, refreshToken, expiration } = action.payload;
      state.user = userName;
      state.token = token;
      state.refreshToken = refreshToken;
      state.expiresAt = expiration;
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
  selectIsAuthKycCompleted,
  selectIsAuthVerified,
};
export default authSlice.reducer;
