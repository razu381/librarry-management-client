import type { borrowApiResponse, IBorrow } from "@/interfaces/borrow interface";
import { baseApi } from "./baseApi";

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowSummary: builder.query<IBorrow[], void>({
      query: () => "borrow/",
      transformResponse: (response: borrowApiResponse) => response?.data,
      providesTags: ["BorrowSummary"],
    }),
    addBorrow: builder.mutation({
      query: (data) => ({
        url: "borrow",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BorrowSummary"],
    }),
  }),
});

export const { useAddBorrowMutation, useBorrowSummaryQuery } = borrowApi;
