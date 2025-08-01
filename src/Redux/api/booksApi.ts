import type {
  BooksApiResponse,
  BookApiResponse,
  IBook,
} from "@/interfaces/book interface";
import { baseApi } from "./baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<BooksApiResponse["data"], void>({
      query: () => "books",
      transformResponse: (response: BooksApiResponse) => response.data,
      providesTags: [{ type: "Books" }],
    }),
    getBookById: builder.query<IBook, string>({
      query: (id) => `books/${id}`,
      transformResponse: (response: { data: IBook }) => response?.data,
      providesTags: (_result, _error, id) => [{ type: "Books", id }],
    }),
    addBook: builder.mutation<BookApiResponse, IBook>({
      query: (book) => ({
        url: "books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: [{ type: "Books" }],
      async onQueryStarted(newBook, { dispatch, queryFulfilled }) {
        // Optimistic update: Add book to cache immediately
        const patchResult = dispatch(
          bookApi.util.updateQueryData(
            "getBooks",
            undefined,
            (draft: IBook[]) => {
              // Generate temporary ID for optimistic update
              const tempBook = {
                ...newBook,
                _id: `temp-${Date.now()}`, // Temporary ID
              };
              draft.push(tempBook);
            }
          )
        );
        try {
          const { data } = await queryFulfilled;
          // Update the cache with the real book data from server
          dispatch(
            bookApi.util.updateQueryData(
              "getBooks",
              undefined,
              (draft: IBook[]) => {
                const tempIndex = draft.findIndex((book) =>
                  book._id?.startsWith("temp-")
                );
                if (tempIndex !== -1) {
                  draft[tempIndex] = data.data; // Replace temp book with real data
                }
              }
            )
          );
        } catch {
          // Revert the optimistic update on failure
          patchResult.undo();
        }
      },
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Books" },
        { type: "Books", id },
      ],
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        // Optimistic update: Update book in cache immediately
        const patchResult = dispatch(
          bookApi.util.updateQueryData(
            "getBooks",
            undefined,
            (draft: IBook[]) => {
              const bookIndex = draft.findIndex((book) => book._id === id);
              if (bookIndex !== -1) {
                // Update the book with new data
                draft[bookIndex] = { ...draft[bookIndex], ...data };
              }
            }
          )
        );

        // Also update the individual book query cache if it exists
        const patchSingleResult = dispatch(
          bookApi.util.updateQueryData("getBookById", id, (draft) => {
            Object.assign(draft, data);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert both optimistic updates on failure
          patchResult.undo();
          patchSingleResult.undo();
        }
      },
    }),
    deleteBook: builder.mutation({
      query: (id) => ({ url: `books/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Books" },
        { type: "Books", id },
      ],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          bookApi.util.updateQueryData(
            "getBooks",
            undefined,
            (draft: IBook[]) => {
              return draft.filter((book) => book._id !== id);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
