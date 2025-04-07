import { configureStore } from "@reduxjs/toolkit";
import userFormReducer from "./complete-profile/slice";

export const store = configureStore({
  reducer: {
    userForm: userFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
