import { apiSlice } from "../api/api.slice";

const kycApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    /**
     * @DESC : Submit kyc
     * @Method : POST
     * @Route : /Kyc
     * @Access :  Private
     * @Headers : { Authorization: Bearer token }
     */
    submitKyc: builder.mutation({
      query: (formData) => ({
        url: "/Kyc",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useSubmitKycMutation } = kycApiSlice;
