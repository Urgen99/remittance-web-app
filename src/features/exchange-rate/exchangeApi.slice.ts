import { apiSlice } from "../api/api.slice";
interface ExchangeRateParams {
  SendingCountry: string;
  SendingCurrency: string;
  ReceivingCountry: string;
  ReceivingCurrency: string;
}
export const exchangeRateApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    /**
     * @DESC : Fetch Exchange Rate
     * @Method : GET
     * @Route : /ExchangeRate
     * @Access :  Private
     * @Headers : { Authorization: Bearer token }
     */

    getExchangeRates: builder.query({
      query: (params: ExchangeRateParams) => ({
        // url: `/ExchangeRate?SendingCountry=Nepal&SendingCurrency=NPR&ReceivingCountry=India&ReceivingCurrency=INR`
        url: `/ExchangeRate`,
        params,
      }),
    }),
  }),
});

export const { useGetExchangeRatesQuery } = exchangeRateApiSlice;
