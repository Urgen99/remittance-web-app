import { AuthResponse } from "@/lib/type";
import { apiSlice } from "../api/api.slice";

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // @DESC: [Register new user]
    // @Route: [POST: /User]
    // Access Public
    register: builder.mutation({
      query: (credentials) => ({
        url: "/User",
        method: "POST",
        body: credentials,
      }),
    }),

    // @DESC: [Login user]
    // @Route: [POST: /User/LoginUser]
    // Access Public
    login: builder.mutation<
      { data: AuthResponse },
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "/User/LoginUser",
        method: "POST",
        body: credentials,
      }),
    }),

    // @DESC: [Refresh token]
    // @Route: [POST: /User/RefreshToken]
    // Access Public
    refreshToken: builder.mutation<AuthResponse, { refreshToken: string }>({
      query: (credentials) => ({
        url: `/User/RefreshToken?refreshToken=${credentials.refreshToken}`,
        method: "POST",
      }),
    }),

    // @DESC: [Check if email exists]
    // @Route: [GET: /User/exists?email="user@email.com"]
    // Access Public
    emailExists: builder.query({
      query: (email) => ({
        url: `/User/exists?email=${email}`,
        method: "GET",
      }),
    }),

    // @DESC: [Verify OTP code]
    // @Route: [POST: /User/ConfirmOtp]
    // Access Public
    verifyOTP: builder.mutation({
      query: (credentials) => ({
        url: "User/ConfirmOtp",
        method: "POST",
        body: credentials,
      }),
    }),

    // @DESC: [Resend OTP code]
    // @Route: [POST: /User/ResendConfirmation]
    // Access Public
    resendOTP: builder.mutation({
      query: (credentials) => ({
        url: "User/ResendConfirmation",
        method: "POST",
        body: credentials,
      }),
    }),

    // ------- FOR TESTING ONLY -------
    // reference data remove later - todo
    fetchReferences: builder.query({
      query: () => ({
        url: "/ReferenceData",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useFetchReferencesQuery,
  useLazyEmailExistsQuery,
  useVerifyOTPMutation,
  useResendOTPMutation,
} = authApiSlice;
