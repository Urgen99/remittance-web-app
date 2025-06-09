import { apiSlice } from "../api/api.slice";

export const usersApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // @DESC: [Update Password]
    // @Route: [PUT: /User/UpdatePassword]
    // Access Private
    // Headers: [Bearer token]
    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: "/User/UpdatePassword",
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export const { useUpdatePasswordMutation } = usersApiSlice;
