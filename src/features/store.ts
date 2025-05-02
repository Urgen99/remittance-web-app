import { clearAuthState, saveAuthState } from "@/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api.slice";
import authReducer from "./auth/auth.slice";
import userFormReducer from "./complete-profile/slice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    userForm: userFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
  devTools: true, // false in production
});

// subscribe to store changes and persist auth state
store.subscribe(() => {
  const authState = store.getState().auth;
  try {
    saveAuthState(authState);
  } catch (error) {
    console.error(`Error while persisting auth state: ${error}`);
    clearAuthState();
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
