import { apiSlice } from "../api/api.slice";

type TransactionResponse = {
  status: number;
  message: string;
  data: number | string;
  errors: [];
};

export type TransactionByIdResponse = {
  sendingCountryId: string | number;
  payoutCountryId: string | number;
  sendingCurrencyId: string | number;
  payoutCurrencyId: string | number;
  remarks: string;
  sendingAmount: number;
  payoutAmount: number;
  exchangeRate: number;
  beneficiaryFirstName: string;
  beneficiaryMiddleName: string;
  beneficiaryLastName: string;
  beneficiaryEmail: string;
  beneficiaryMobileNumber: string;
  beneficiaryAddress: string;
  beneficiaryAddressLine1: AddressLine;
  paymentTypeName: string;
  deliveryMethodName: string;
  paymentInstitutionId: string | number;
  paymentInstitutionBranch: string;
  paymentInstitutionUniqueNo: string;
  accountName: string;
  status: number;
  uniqueId: string;
  channel: string | null;
  createdTs: string;
};

type AddressLine = {
  countryId: number | string;
  postCode: string;
  unit: string;
  street: string;
  city: string;
  state: string;
  address: string;
  countryDetail: string | null;
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
    // type any for now the request body
    initiateTransaction: builder.mutation<TransactionResponse, any>({
      query: (formData) => ({
        url: "/Transaction",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: TransactionResponse) => response,
    }),

    /**
     * @DESC : Get Transaction By Id
     * @Method : Get
     * @Route : /Transaction/{id}
     * @Access :  Private
     * @Headers : { Authorization: Bearer token }
     */
    // type any for now the request body
    getTransactionById: builder.query<any, string>({
      query: (id) => ({
        url: `/Transaction/${id}`,
        method: "GET",
      }),
      // transformResponse: (response: TransactionResponse) => response,
      // transformResponse: (
      //   response: TransactionResponse
      // ): TransactionResponse => ({
      //   status: response.status,
      //   message: response.message,
      //   errors: response.errors || [],
      //   data: {
      //     sendingAmount: Number(response.data.sendingAmount.toFixed(2)),
      //     payoutAmount: Number(response.data.payoutAmount.toFixed(2)),
      //     channel: response.data.channel || "Web",
      //     remarks: response.data.remarks,
      //     accountName: response.data.accountName,
      //     paymentTypeName: response.data.paymentTypeName,
      //     createdTs: new Date(response.data.createdTs).toISOString(),
      //   } as TransactionByIdResponse,
      // }),
    }),
  }),
});

export const { useInitiateTransactionMutation, useGetTransactionByIdQuery } =
  transactionsApiSlice;
