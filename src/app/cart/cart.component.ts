import { Component } from '@angular/core';
import { Cart } from '../Model/Cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: Cart[] = [];
  totalPrice: number = 0;
  
  constructor(private cartService: CartService) {}

  ngOnInit() {
    const TOKEN = localStorage.getItem('token');
    this.cartService.getCart().subscribe((result: any) => {
      this.cart = result.data;
      this.calculateTotalPrice()
      this.cartService.pushToCart(this.cart);
    });
  }
  increaseQuantity(cartItem: Cart) {
    this.cartService
      .updateQuantity(cartItem.cartId!, cartItem.quantity! + 1)
      .subscribe((result: any) => {
        cartItem.quantity!++;
        this.calculateTotalPrice()
      });
  }
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
  updateQuantity(event: any, cartItem: Cart) {
    this.cartService
      .updateQuantity(cartItem.cartId!, event.target.value)
      .subscribe((result: any) => {
        cartItem.quantity = event.target.value;
        this.calculateTotalPrice()
      });
  }

  calculateTotalPrice() { 
    let total=0;   
    this.cart.forEach((cartItem) => {
      total += cartItem.book?.bookPrice!*cartItem.quantity!;
    });
    this.totalPrice=total
  }
}
