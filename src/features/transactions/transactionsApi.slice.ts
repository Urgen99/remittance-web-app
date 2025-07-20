import { apiSlice } from "../api/api.slice";

type TransactionResponse = {
  status: number;
  message: string;
  data: number | string[];
  errors: [];
};

const transactionsApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    /**
     * @DESC : Initiate Transaction
     * @Method : POST
     * @Route : /Transaction
     * @Access :  Private
     * @Headers : { Authorization: Bearer token }
     */
    initiateTransaction: builder.mutation<TransactionResponse, any>({
      query: (formData) => ({
        url: "/Transaction",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: TransactionResponse) => response,
    }),
  }),
});

export const { useInitiateTransactionMutation } = transactionsApiSlice;
