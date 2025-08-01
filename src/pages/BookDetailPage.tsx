import { useGetBookByIdQuery } from "@/Redux/api/booksApi";
import { useParams } from "react-router";

function formatDate(dateString?: string) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id);
  console.log(book);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading book details...
      </div>
    );
  }
  if (isError || !book) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600">
        Book not found.
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-blue-50 to-purple-100 py-20 px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-gray-200">
        {/* Left: Book  */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-purple-800 mb-2 tracking-tight">
              {book.title}
            </h1>
            <h2 className="text-lg text-gray-600 mb-4">
              by{" "}
              <span className="font-semibold text-gray-900">{book.author}</span>
            </h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {book.genre}
              </span>
              <span className="inline-block px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                ISBN: {book.isbn}
              </span>
              <span
                className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${
                  book.available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {book.available ? "Available" : "Unavailable"}
              </span>
              <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                Copies: {book.copies}
              </span>
            </div>
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line border-l-4 border-purple-200 pl-4 bg-purple-50 py-2 rounded-md">
                {book.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-xs text-gray-400 mt-8">
            <div>
              Created:{" "}
              <span className="font-mono">{formatDate(book?.createdAt)}</span>
            </div>
            <div>
              Last Updated:{" "}
              <span className="font-mono">{formatDate(book?.updatedAt)}</span>
            </div>
            <div>
              Book ID: <span className="font-mono text-xs">{book._id}</span>
            </div>
          </div>
        </div>
        {/* Right: Decorative/Visual (optional) */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-purple-100 to-blue-100 w-64 p-8">
          <div className="w-32 h-32 rounded-xl bg-purple-200 flex items-center justify-center mb-4">
            <span className="text-6xl text-purple-400">📚</span>
          </div>
          <div className="text-center text-purple-700 font-bold text-lg">
            Dreamer Den Library
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetailPage;
