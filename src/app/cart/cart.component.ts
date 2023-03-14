import { Component } from '@angular/core';
import { Cart } from '../Model/Cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: Cart[] = [];//cart item list
  totalPrice: number = 0;//total price of cart items
  
  constructor(private cartService: CartService) {}

  /* Lifecycle hook when component is mounted */
  ngOnInit() {
    const TOKEN = localStorage.getItem('token');
    this.cartService.getCart().subscribe((result: any) => {
      this.cart = result.data;
      this.calculateTotalPrice()
      this.cartService.pushToCart(this.cart);
    });
  }
  /* 
    increase the quantity of a book in the cart by calling cartservice method
    @param {Cart} cartItem the item in cart
  */
  increaseQuantity(cartItem: Cart) {
    this.cartService
      .updateQuantity(cartItem.cartId!, cartItem.quantity! + 1)
      .subscribe((result: any) => {
        cartItem.quantity!++;
        this.calculateTotalPrice()
      });
  }

   /* 
    decrease the quantity of a book in the cart by calling cartservice method
    @param {Cart} cartItem the item in cart
  */
  decreaseQuantity(cartItem: Cart) {
    let latestQuantity = cartItem.quantity! - 1;
    if (latestQuantity == 0) {
      this.cartService
        .deleteCartItem(cartItem.cartId!)
        .subscribe((result: any) => {
          if (result.data) {
            this.cart = this.cart.filter(
              (item) => item.cartId !== cartItem.cartId
            );
            this.calculateTotalPrice()
            this.cartService.pushToCart(this.cart);
          }
        });
    } else {
      this.cartService
        .updateQuantity(cartItem.cartId!, latestQuantity)
        .subscribe((result: any) => {
          cartItem.quantity!--;
          this.calculateTotalPrice()
        });
    }
  }
  /* 
    update the quantity of a book in the cart to what ever input providefd by calling cartservice method
    @param {Cart} cartItem the item in cart
    @param {any} event object of change event of quantity input
  */
  updateQuantity(event: any, cartItem: Cart) {
    this.cartService
      .updateQuantity(cartItem.cartId!, event.target.value)
      .subscribe((result: any) => {
        cartItem.quantity = event.target.value;
        this.calculateTotalPrice()
      });
  }
  /* 
    calculate total price of all item in the cart whenever a item is a added or deleted
  */
  calculateTotalPrice() { 
    let total=0;   
    this.cart.forEach((cartItem) => {
      total += cartItem.book?.bookPrice!*cartItem.quantity!;
    });
    this.totalPrice=total
  }
}
