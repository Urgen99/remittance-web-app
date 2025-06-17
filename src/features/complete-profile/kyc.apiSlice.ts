import { apiSlice } from "../api/api.slice";

export const kycApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // complete profile endpoint
    submitKyc: builder.mutation({
      query: (formData) => ({
        url: "/Kyc",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
  }),
});

export const { useSubmitKycMutation } = kycApiSlice;
