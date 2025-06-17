import { apiSlice } from "../api/api.slice";

export const usersApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    /**
     * @DESC : Update User Password
     * @Method : PUT
     * @Route : /User/UpdatePassword
     * @Access :  Private
     * @Headers : { Authorization: Bearer token }
     */
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
