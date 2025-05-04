import { apiSlice } from "../api/api.slice";

export const usersApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
      query: (email) => ({
        url: `/User/getByEmail/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetUserByEmailQuery } = usersApiSlice;
