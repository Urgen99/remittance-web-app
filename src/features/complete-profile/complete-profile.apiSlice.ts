import { apiSlice } from "../api/api.slice";

export const completeProfileApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // complete profile endpoint
    completeProfile: builder.mutation({
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

export const { useCompleteProfileMutation } = completeProfileApiSlice;
