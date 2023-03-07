import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../Model/Cart';
import { User } from '../Model/User';
import { BookService } from '../services/book.service';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public searchTerm:string="";
  public badgeCount:number=0;

  @ViewChild('searchBox') searchBox:any; 
  user: User={};
  cart:Cart[]=[];
  constructor(private bookService:BookService,private userService:UserService,private cartService:CartService,private router:Router){}
  search() {
    this.bookService.search.next(  this.searchBox.nativeElement.value);
  }
  ngOnInit(){
    this.userService.user.subscribe((user) => {
      this.user=user;
    });
    const userJSON=localStorage.getItem('user data')
    if(userJSON){
      this.user=JSON.parse(userJSON || '{}')
    }
    this.cartService.cart.subscribe((cart:any)=>{
   if(JSON.stringify(cart)!=='{}'&&JSON.stringify(cart)!=='[]'){
      if(cart.length)
        this.badgeCount=cart.length
      else
        this.badgeCount++
   }
   if(JSON.stringify(cart)==='[]'){
    this.badgeCount=0
   }
    })

   
    console.log('user :>> ', this.user);
  }

  toCart(){
    if(Object.keys(this.user).length === 0){
      this.router.navigate(["/login"])
      return;
    }
    this.router.navigate(["/cart"])
  }

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user data")
    this.user={}
    this.cartService.pushToCart([])
  }
}
