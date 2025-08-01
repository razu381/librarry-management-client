// ...other imports...
import type { IBook } from "@/interfaces/book interface";
import { useDeleteBookMutation, useGetBooksQuery } from "@/Redux/api/booksApi";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function BookTable() {
  let { data: booksData, error, isLoading } = useGetBooksQuery();
  console.log(booksData);

  let [deleteBook] = useDeleteBookMutation();

  const columnHelper = createColumnHelper<IBook>();

  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => {
        let title = info.getValue();
        return (
          <Link
            to={`/books/${info.row.original._id}`}
            className="font-semibold"
          >
            {title}
          </Link>
        );
      },
    }),
    columnHelper.accessor("author", {
      header: "Author",
    }),
    columnHelper.accessor("genre", {
      header: "Genre",
      cell: (info) => {
        let genre = info.getValue();
        return <p className="lowercase">{genre}</p>;
      },
    }),
    columnHelper.accessor("isbn", {
      header: "ISBN",
    }),
    columnHelper.accessor("copies", {
      header: "Copies",
    }),
    columnHelper.accessor("available", {
      header: "Availability",
      cell: (info) =>
        info.getValue() ? (
          <p>Available</p>
        ) : (
          <p className="text-red-500">Unavailable</p>
        ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => {
        let bookId = info.row.original?._id;

        return (
          <div className="flex gap-2">
            <Link to={`/edit-book/${bookId}`} className="text-blue-600">
              Edit
            </Link>
            <button
              onClick={() => bookId && handleDeleteBook(bookId)}
              className="text-red-600"
              disabled={!bookId}
            >
              Delete
            </button>
            <Link to={`/borrow/${bookId}`} className="text-green-600">
              Borrow
            </Link>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: booksData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  async function handleDeleteBook(id: string) {
    console.log("Deleting book with ID:", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBook(id);
          toast.success("Book deleted successfully");
        } catch (err) {
          console.log("There has been an error deleting the book", err);
          toast.error("There has been an error deleting the book");
        }
      }
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    let errorMessage = "An error occurred";
    if ("status" in error) {
      // FetchBaseQueryError
      if (typeof error.data === "string") {
        errorMessage = error.data;
      } else if (
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data
      ) {
        errorMessage =
          (error.data as { message?: string }).message || errorMessage;
      }
    } else if ("message" in error) {
      // SerializedError
      errorMessage = error.message as string;
    }
    return <div>Error: {errorMessage}</div>;
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No books found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default BookTable;
