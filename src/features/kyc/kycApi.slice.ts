import { apiSlice } from "../api/api.slice";

type Address = {
  street: string;
  city: string;
  country: string;
};

type Documents = {
  documentType: string;
  url: string;
};

export type GetKycByUserResponse = {
  firstName: string;
  middleName: string;
  lastName: string;
  permanentAddress: Address;
  identityExpiryDate: string;
  identityNo: string;
  documents: Documents[];
};

const kycApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    /**
     * @DESC : Submit KYC
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

    /**
     * @DESC : Get KYC by user
     * @Method : GET
     * @Route : /Kyc/getByUser/{userId}?userProfileId={userProfileId}
     * @Access :  Private
     * @Headers : { Authorization: Bearer token }
     */
    getKycByUser: builder.query<
      {
        data: GetKycByUserResponse;
      },
      string | number
    >({
      query: (id) => ({
        url: `/Kyc/getByUser/${id}`,
      }),
    }),
  }),
});

export const { useSubmitKycMutation, useGetKycByUserQuery } = kycApiSlice;
