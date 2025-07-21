import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api.slice";
import authReducer from "./auth/auth.slice";
import exchangeRateReducer from "./exchange-rate/exchange.slice";
import kycReducer from "./kyc/kyc.slice";
import transactionReducer from "./transactions/transactions.slice";
import usersReducer from "./users/users.slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    transactions: transactionReducer,
    users: usersReducer,
    exchangeRate: exchangeRateReducer,
    kyc: kycReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
  devTools: true, // false in production
});

// subscribe to store changes and persist auth state

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
