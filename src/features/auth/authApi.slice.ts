import { AuthResponse } from "@/lib/type";
import { apiSlice } from "../api/api.slice";

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    /**
     * @DESC : Register new user
     * @Method : POST
     * @Route : /User
     * @Access : Public
     */
    register: builder.mutation({
      query: (credentials) => ({
        url: "/User",
        method: "POST",
        body: credentials,
      }),
    }),

    /**
     * @DESC : Login user
     * @Method : POST
     * @Route : /User/LoginUser
     * @Access : Public
     */

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
    // sendRefreshToken: builder.mutation<
    //   { data: AuthResponse },
    //   { refreshToken: string }
    // >({
    //   query: (credentials) => ({
    //     url: `/User/RefreshToken?refreshToken=${credentials.refreshToken}`,
    //     method: "POST",
    //   }),
    // }),

    /**
     * @DESC : Check if email exists
     * @Method : GET
     * @Route : /User/exists?email="user@email.com"
     * @Access : Public
     */

    emailExists: builder.query({
      query: (email) => ({
        url: `/User/exists?email=${email}`,
        method: "GET",
      }),
    }),

    /**
     * @DESC : [Verify OTP code]
     * @Method : POST
     * @Route : /User/ConfirmOtp
     * @Access : Public
     */

    verifyOTP: builder.mutation({
      query: (credentials) => ({
        url: "User/ConfirmOtp",
        method: "POST",
        body: credentials,
      }),
    }),

    /**
     * @DESC : Resend OTP code
     * @Method : POST
     * @Route : /User/ResendConfirmation
     * @Access : Public
     */

    resendOTP: builder.mutation({
      query: (credentials) => ({
        url: "User/ResendConfirmation",
        method: "POST",
        body: credentials,
      }),
    }),

    /**
     * @DESC : [Forgot Password]
     * @Method : POST
     * @Route : /User/ResetPassword?email=test@gmail.com
     * @Access : Public
     */
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `/User/ResetPassword?email=${email}`,
        method: "POST",
      }),
    }),

    /**
     * @DESC : Reset Password
     * @Method : POST
     * @Route : /User/SetNewPassword
     * @Access : Public
     */
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/User/SetNewPassword",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLazyEmailExistsQuery,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  // useSendRefreshTokenMutation,
} = authApiSlice;
