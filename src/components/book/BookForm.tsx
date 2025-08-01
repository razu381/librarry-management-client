"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import {
  useAddBookMutation,
  useEditBookMutation,
  useGetBookByIdQuery,
} from "@/Redux/api/booksApi";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(4, "Author must be at least 10 characters"),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string().min(1, "ISBN is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  copies: z.number().int("Copies must be a whole number"),
  available: z.boolean().optional(),
});

type BookFormDataType = z.infer<typeof bookSchema>;

type BookFormProps = {
  id?: string;
};

function BookForm({ id }: BookFormProps) {
  let navigate = useNavigate();
  let { data: postData } = useGetBookByIdQuery(id ?? "", {
    skip: !id,
  });

  //console.log("Postdata: ", postData?.data);
  let [addBook] = useAddBookMutation();
  let [editBook, { isSuccess: isEditBookSuccess }] = useEditBookMutation();

  const form = useForm<BookFormDataType>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: undefined,
      isbn: "",
      description: "",
      copies: 0,
      available: true,
    },
  });

  useEffect(() => {
    if (postData) {
      form.reset(postData);
    }
  }, [postData, form]);

  async function onSubmit(data: BookFormDataType) {
    //console.log(data);
    try {
      if (id) {
        console.log("Editing book with id:", id);
        await editBook({ id, data }).unwrap();
        if (isEditBookSuccess) {
          toast.success("Book updated successfully");
        }
      } else {
        await addBook(data).unwrap();
        toast.success("Book added successfully");
        form.reset();
        navigate("/books");
      }
    } catch (err: any) {
      console.log(err);
      toast.error("There has been an error", err?.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Author " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FICTION">Fiction</SelectItem>
                  <SelectItem value="NON_FICTION">Non fiction</SelectItem>
                  <SelectItem value="SCIENCE">science</SelectItem>
                  <SelectItem value="HISTORY">History</SelectItem>
                  <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                  <SelectItem value="FANTASY">Fantasy</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input placeholder="ISBN " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="copies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of copies</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Copies"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? undefined : Number(e.target.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value === "true")}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Unavailable</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default BookForm;
