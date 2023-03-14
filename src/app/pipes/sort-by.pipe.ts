import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../Model/Book';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
   /* 
  sorts the input books by book pobject key and order ofsorting
  @param {Book[]} books,list of books
  @param {string} sortKey,book object key to sort by
  @param {string} sortOrder,sorting order
  @return {Book[]} books
  */
  transform(books: Book[],sortKey:any,sortOrder?:string): Book[] {
    sortOrder = sortOrder && (sortOrder.toLowerCase() as any);
    if (!books || sortKey=="relevance") return books.sort((a:Book, b:Book) => a['bookId' as keyof Book] - b['bookId' as keyof Book]);
    const sorted = books.sort((a:Book, b:Book) => a[sortKey as keyof Book] - b[sortKey as keyof Book]);
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }

}
