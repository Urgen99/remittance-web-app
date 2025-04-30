import { configureStore } from "@reduxjs/toolkit";
import userFormReducer from "./complete-profile/slice";
import { apiSlice } from "./api/api.slice";
import authReducer from "./auth/auth.slice";
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
