import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { user: null, token: null, email: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },

    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut, setEmail } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentEmail = (state: RootState) => state.auth.email;

export default authSlice.reducer;
