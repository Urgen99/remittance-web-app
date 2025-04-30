import { BASE_URL } from "@/lib/constant";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../auth/auth.slice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// wrapping baseQuery with baseQuery re-auth function
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, store, extraOptions) => {
  let result = await baseQuery(args, store, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token"); // remove later

    // send the refresh token to get new accessToken
    const refreshResult = await baseQuery("/user/refresh", store, extraOptions);
    console.log("Refresh the result", refreshResult); // remove later

    if (refreshResult?.data) {
      const user = (store.getState() as RootState).auth.user;

      // store the new token
      store.dispatch(setCredentials({ ...refreshResult.data, user }));

      // retry the original query with new accessToken
      result = await baseQuery(args, store, extraOptions);
    } else {
      store.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});
