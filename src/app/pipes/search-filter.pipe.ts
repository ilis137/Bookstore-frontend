import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../Model/Book';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  /* 
  transform the input books and filters them by search term
  @param {Book[]} books,list of books
  @param {string} searchTerm,search key to filter by
  @return {Book[]} books
  */
  transform(books: Book[], searchTerm:string): Book[] {
    const result : any = [];
    if(!books || searchTerm == '' ) {
      return books;
    }
    books.forEach((book:any) => {
      if(book["bookName"].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())) {
        result.push(book);
      }
    });
    return result;
  }

}
