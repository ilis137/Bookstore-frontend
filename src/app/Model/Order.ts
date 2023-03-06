import { Book } from "./Book";
import { User } from "./User";

export interface Order {
  orderId?: number;
  userId?: number;
  bookId?: number;
  user?: User;
  book?: Book;
  quantity?: number;
  creationDate?:string;
  price?: number;
  name?: string
  pincode?:string,
  city?:string ,
  state?:string ,
  password?: string,
  address?: string,
  phoneNumber?: string,
  type?:string ,
  canceled?:boolean
}
