import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns";
import { useAddBorrowMutation } from "@/Redux/api/borrowApi";
import { toast } from "react-toastify";

const borrowSchema = z.object({
  book: z.string(),
  quantity: z
    .number()
    .int("Must be a whole number")
    .min(1, "At least 1 copy required"),
  dueDate: z
    .date()
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: "Due date is required",
    }),
});

type BorrowFormType = z.infer<typeof borrowSchema>;

function BorrowForm() {
  let navigate = useNavigate();
  let { bookId } = useParams<{ bookId: string }>();

  let [addBorrow, { isLoading, isSuccess, error }] = useAddBorrowMutation();

  const form = useForm<BorrowFormType>({
    resolver: zodResolver(borrowSchema),
    defaultValues: {
      book: bookId || "",
      quantity: 1,
      dueDate: undefined,
    },
  });

  const onSubmit = async (data: BorrowFormType) => {
    // handle borrow logic here
    console.log("Borrow data:", data);
    try {
      await addBorrow(data).unwrap();

      if (isSuccess) {
        toast.success("Book borrowed successfully");
        navigate("/borrow-summary");
      }
    } catch (err: any) {
      console.log("There has been an error Borrowing the book: ", err);
      toast.error("There has been an error", err?.data?.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Borrowing book...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600">
        Error: {error?.data?.message || "An error occurred while borrowing."}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow border">
      <h2 className="text-2xl font-bold mb-6 text-center">Borrow Book</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="book"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Book ID" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Copies</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="Enter quantity"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
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
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={clsx(
                          " pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      //   disabled={(date) =>
                      //     date > new Date() || date < new Date("1900-01-01")
                      //   }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isLoading ? "Borrowing book..." : "Borrow"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default BorrowForm;
