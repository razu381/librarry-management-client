type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook {
  _id?: string; // MongoDB ID
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export interface BooksApiResponse {
  success: true;
  message: string;
  data: IBook[];
}

export interface BookApiResponse {
  success: true;
  message: string;
  data: IBook;
}
