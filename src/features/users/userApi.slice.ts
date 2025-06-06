import { apiSlice } from "../api/api.slice";

export const usersApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({}),
});

// export const { } = usersApiSlice;
