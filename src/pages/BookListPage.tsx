import BookTable from "@/components/book/BookTable";

function BookListPage() {
  // let { data } = useGetBooksQuery();
  // console.log(data);

  return (
    <div className="px-10 py-10">
      <BookTable />
    </div>
  );
}

export default BookListPage;
