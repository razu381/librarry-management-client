export interface IBorrow {
  book: string;
  quantity: number;
  dueDate: Date;
}

export interface borrowApiResponse {
  success: boolean;
  message?: string;
  data: IBookSummary[];
}

export interface IBookSummary {
  book: {
    isbn: string;
    title: string;
    // add other book fields if needed
  };
  totalQuantity: number;
}
