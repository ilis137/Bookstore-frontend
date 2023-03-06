import { Book } from "./Book";
import { User } from "./User";

export interface Cart {
  cartId?: number;
  userId?: number;
  bookId?: number;
  user?: User;
  book?: Book;
  quantity?: number;
  totalPrice?: number;
}
