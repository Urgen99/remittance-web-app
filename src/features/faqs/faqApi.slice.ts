import { apiSlice } from "../api/api.slice";

interface FaqResponse {
  status: number | string;
  message: string;
  errors: string[];
  data: Faq[];
}

interface Faq {
  id: string | number;
  question: string;
  answer: string;
}

export const faqsApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    /**
     * @DESC : Fetch All FAQs
     * @Method : GET
     * @Route : /Faq
     * @Access :  Private
     * @Headers : { Authorization: Bearer token }
     */

    getAllFaqs: builder.query<FaqResponse, void>({
      query: () => ({ url: `/Faq` }),
      transformResponse: (response: FaqResponse): FaqResponse => ({
        status: response.status,
        message: response.message,
        errors: response.errors || [],
        data: response.data.map((item: Faq) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
        })),
      }),
    }),
  }),
});

export const { useGetAllFaqsQuery } = faqsApiSlice;
