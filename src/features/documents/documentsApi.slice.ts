import { apiSlice } from "../api/api.slice";

export const documentsApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    /**
     * @DESC : Upload a Document
     * @Method : POST
     * @Route : /Documents
     * @Access :  Private
     * @Headers : { Authorization: Bearer token }
     */
    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: "/Documents",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadDocumentMutation } = documentsApiSlice;
