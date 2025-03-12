import { configureStore } from "@reduxjs/toolkit";
import userFormSlice from "./complete-profile/slice";

export const store = configureStore({
  reducer: {
    [userFormSlice.name]: userFormSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
