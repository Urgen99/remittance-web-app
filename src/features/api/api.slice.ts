import { BASE_URL } from "@/lib/constant";
import { AuthResponse } from "@/lib/type";
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
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  //  if status is 401/403 and refresh token exists then try to refresh
  if (result?.error?.status === 401 || result?.error?.status === 403) {
    console.log("sending refresh token"); // remove later
    // const refreshToken = (store.getState() as RootState).auth.refreshToken;
    const { refreshToken, expiresAt } = (api.getState() as RootState).auth;

    // check if refresh token exists and isn't expired
    if (!refreshToken || (expiresAt && expiresAt < Date.now())) {
      api.dispatch(logOut());
      return result;
    }

    // send the refresh token to get new accessToken
    const refreshResult = await baseQuery(
      {
        url: `/User/RefreshToken?refreshToken=${refreshToken}`,
        method: "POST",
      },
      api,
      extraOptions
    );
    console.log("Refresh the result", refreshResult); // remove later

    if (refreshResult?.data) {
      // const user = (api.getState() as RootState).auth.user;
      api.dispatch(setCredentials(refreshResult.data as AuthResponse));
      // store the new token
      // store.dispatch(setCredentials({ ...(refreshResult.data as any), user }));

      // retry the original query with new accessToken
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
