import BookListPage from "../pages/BookListPage";
import CreateBookPage from "../pages/CreateBookPage";
import BookDetailPage from "../pages/BookDetailPage";
import EditBookPage from "../pages/EditBookPage";
import BorrowBookPage from "../pages/BorrowBookPage";
import BorrowSummaryPage from "../pages/BorrowSummaryPage";
import { createBrowserRouter } from "react-router";
import Layout from "@/components/layout/Layout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <BookListPage /> }, // Default route
      { path: "books", element: <BookListPage /> },
      { path: "create-book", element: <CreateBookPage /> },
      { path: "books/:id", element: <BookDetailPage /> },
      { path: "edit-book/:id", element: <EditBookPage /> },
      { path: "borrow/:bookId", element: <BorrowBookPage /> },
      { path: "borrow-summary", element: <BorrowSummaryPage /> },
      { path: "*", element: <BookListPage /> },
    ],
  },
]);

export default routes;
