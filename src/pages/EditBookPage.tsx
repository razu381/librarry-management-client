import BookForm from "@/components/book/BookForm";
import { useParams } from "react-router";

function EditBookPage() {
  let { id } = useParams<{ id: string }>();
  return (
    <div className="max-w-[70%] mx-auto my-20">
      <BookForm id={id} />
    </div>
  );
}

export default EditBookPage;
