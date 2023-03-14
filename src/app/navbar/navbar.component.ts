import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Cart } from '../Model/Cart';
import { User } from '../Model/User';
import { BookService } from '../services/book.service';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  public searchTerm: string = '';
  public badgeCount: number = 0;

  @ViewChild('searchBox') searchBox: any;
  user: User = {};
  cart: Cart[] = [];
  showSearch: boolean = false;
  constructor(
    private bookService: BookService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        if (event.url === '/home') this.showSearch = true;
        else this.showSearch = false;
      }
    });
  }
  search() {
    this.bookService.search.next(this.searchBox.nativeElement.value);
  }
   /* Lifecycle hook when component is mounted */
  ngOnInit() {
    this.userService.user.subscribe((user) => {
      this.user = user;
    });
    const userJSON = localStorage.getItem('user data');
    if (userJSON) {
      this.user = JSON.parse(userJSON || '{}');
    }
    this.cartService.cart.subscribe((cart: any) => {
      if (JSON.stringify(cart) !== '{}' && JSON.stringify(cart) !== '[]') {
        if (cart.length) this.badgeCount = cart.length;
        else this.badgeCount++;
      }
      if (JSON.stringify(cart) === '[]') {
        this.badgeCount = 0;
      }
    });

    console.log('user :>> ', this.user);
  }
  //called when cart icon is clicked,to check wether user is logged in or not if not it will
  //navigate tologin page
  toCart() {
    if (Object.keys(this.user).length === 0) {
      this.router.navigate(['/login']);
      return;
    }
    console.log('object :>> ', this.user.verified);
    if (this.user.verified === 'false') {
      console.log('object :>> ', this.user.verified);

      return;
    } else {
      this.router.navigate(['/cart']);
    }
  }
  /* will clear token and user details from local storage
  and will inform other components of logout action
  */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user data');
    this.user = {};
    this.cartService.pushToCart([]);
    this.userService.logout()
  }
}
