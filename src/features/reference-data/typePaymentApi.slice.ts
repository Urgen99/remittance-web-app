import { apiSlice } from "../api/api.slice";

interface PaymentTypeResponse {
  message: string;
  data: PaymentType[];
  errors: string[];
}

interface PaymentType {
  name: string;
  id: number;
}

export const paymentApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    /**
     * @DESC : Fetch All Payment Types
     * @Method : GET
     * @Route : /ReferenceData?TypeName=PAYMENT_TYPE
     * @Access :  Private
     * @Headers : { Authorization: Bearer token }
     */

    getPaymentTypes: builder.query<PaymentTypeResponse, string>({
      query: (typeName) => ({
        url: "/ReferenceData",
        params: { TypeName: typeName },
      }),

      transformResponse: (
        response: PaymentTypeResponse
      ): PaymentTypeResponse => ({
        message: response.message,
        data:
          response.data.map((item: PaymentType) => ({
            name: item.name,
            id: item.id,
          })) || [],
        errors: response.errors || [],
      }),
    }),
  }),
});

export const { useGetPaymentTypesQuery } = paymentApiSlice;
