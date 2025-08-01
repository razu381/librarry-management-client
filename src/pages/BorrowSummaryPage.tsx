import { useBorrowSummaryQuery } from "@/Redux/api/borrowApi";

// Interface for a single book summary card

function BorrowSummaryPage() {
  const { data, isLoading, isError } = useBorrowSummaryQuery();
  console.log(data);

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load borrow summary.
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Borrow Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data ? (
          data.map((item) => (
            <div
              key={item.book.isbn}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">{item.book.title}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">ISBN:</span> {item.book.isbn}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Total Borrowed:</span>{" "}
                {item.totalQuantity}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No borrow summary found.
          </div>
        )}
      </div>
    </div>
  );
}

export default BorrowSummaryPage;
