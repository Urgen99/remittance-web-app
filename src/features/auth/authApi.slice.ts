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

    // refresh token
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
} = authApiSlice;
