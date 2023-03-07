import { Book } from "./Book";
import { User } from "./User";


export interface Wishlist {
 
  wishlistId?: number;
  user?:User;
  book?: Book;
  bookId?: number;
 
}
