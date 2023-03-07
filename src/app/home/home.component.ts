import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../Model/Book';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Cart } from '../Model/Cart';
import { WishlistService } from '../services/wishlist.service';
import { Wishlist } from '../Model/Wishlist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public sortBy: string = 'Relevance';
  public bookLength: number = 125;
  public sortByOptions: string[] = [
    'Relevance',
    'Price:Low to High',
    'Price:High to Low',
  ];
  sortKey: string = 'relevance';
  sortOrder: string = 'asc';
  books!: Book[];
  pageSize: number = 12;
  currentPage: number = 0;
  searchTerm: string = '';
  public addedToBag:number[]=[];
  public addedToWishlist:number[]=[];
  constructor(private bookService: BookService,private cartService: CartService,private wishlistService: WishlistService, private router: Router) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((result: any) => {
      this.books = result.data;
    });
    this.bookService.search.subscribe((value) => {
      this.searchTerm = value;
      this.currentPage = 0;
    });
    const TOKEN=localStorage.getItem('token')
  
    if(TOKEN){
    
      this.cartService.getCart().subscribe((result:any)=>{
        let cart=result.data;
        this.cartService.pushToCart(result.data);
        result.data.forEach((cartItem:any)=>{
          this.addedToBag.push(cartItem.book.bookId);
        })
        
      })
      this.wishlistService.getWishlist().subscribe((result:any)=>{
        result.data.forEach((wish:any)=>{
          this.addedToWishlist.push(wish.book.bookId);
        })
        
    })
    }
    
  }

  get totalPages() {
    return this.books.length / this.pageSize;
  }

  sort() {
    switch (this.sortBy) {
      case 'Price:Low to High':
        this.sortKey = 'bookPrice';
        this.sortOrder = 'asc';
        break;
      case 'Price:High to Low':
        this.sortKey = 'bookPrice';
        this.sortOrder = 'desc';
        break;
      default:
        this.sortKey = 'relevance';
        break;
    }
    this.currentPage = 0;
  }

  addToCart(book: Book) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['login']);
      return;
    }
    let cart:Cart={
      bookId:book.bookId,
      quantity:1
    }
    this.cartService.addToCart(cart).subscribe((result:any)=>{
          this.cartService.pushToCart(result.data);
          this.addedToBag.push(result.data.book.bookId);
          // let cartJson=sessionStorage.getItem("cart")
          // let cart:Cart[]=[]
          // if(cartJson){
          //   cart=JSON.parse(cartJson)
          //   cart.push(result.data)
          
          // }else{
          //   cart.push(result.data);            
          // } 
          // sessionStorage.setItem("cart",JSON.stringify(cart))
    })
  }
  addToWishlist(book: Book) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['login']);
      return;
    }
    let wishlist:Wishlist={
      bookId:book.bookId
    }
    this.wishlistService.addToWishlist(wishlist).subscribe((result:any)=>{
          
        this.addedToWishlist.push(result.data.book.bookId);
    })
  }

  inCart(bookId:number){
      return this.addedToBag.includes(bookId);
  }
  inWishlist(bookId:number){
      return this.addedToWishlist.includes(bookId);
  }
}
