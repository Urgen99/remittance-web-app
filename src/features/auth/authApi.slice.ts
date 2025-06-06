import { apiSlice } from "../api/api.slice";

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // register endpoint
    register: builder.mutation({
      query: (credentials) => ({
        url: "/User",
        method: "POST",
        body: credentials,
      }),
    }),
    // login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: "/User/LoginUser",
        method: "POST",
        body: credentials,
      }),
    }),

    // verify if email exists
    emailExists: builder.query({
      query: (email) => ({
        url: `/User/exists?email=${email}`,
        method: "GET",
      }),
    }),

    // verify otp code
    verifyOTP: builder.mutation({
      query: (credentials) => ({
        url: "User/ConfirmOtp",
        method: "POST",
        body: credentials,
      }),
    }),

    // resend otp confirmation code
    resendOTP: builder.mutation({
      query: (credentials) => ({
        url: "User/ResendConfirmation",
        method: "POST",
        body: credentials,
      }),
    }),

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
