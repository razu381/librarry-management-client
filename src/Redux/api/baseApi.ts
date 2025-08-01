import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-server-five-beta.vercel.app/api/",
  }),
  tagTypes: ["Books", "BorrowSummary"],
  endpoints: () => ({}),
});
