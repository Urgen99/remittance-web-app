import { apiSlice } from "../api/api.slice";

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: "/User/LoginUser",
        method: "POST",
        body: credentials,
      }),
    }),

    // remaining to build by backend
    refreshToken: builder.mutation({
      query: () => ({
        url: "/User/RefreshToken",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApiSlice;
