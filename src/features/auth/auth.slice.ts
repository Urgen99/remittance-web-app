import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { clearAuthState, loadAuthState } from "@/lib/storage";
interface AuthPayload {
  userName: string;
  token: string;
  refreshToken: string;
  expiration: string;
}

const initialState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      const { userName, token, refreshToken, expiration } = action.payload;
      state.user = userName;
      state.token = token;
      state.refreshToken = refreshToken;
      state.expiresAt = expiration;
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

export const { setCredentials, logOut, setEmail } = authSlice.actions;

const selectCurrentUser = (state: RootState) => state.auth.user;
const selectCurrentToken = (state: RootState) => state.auth.token;
const selectCurrentEmail = (state: RootState) => state.auth.email;

export { selectCurrentEmail, selectCurrentToken, selectCurrentUser };

export default authSlice.reducer;
