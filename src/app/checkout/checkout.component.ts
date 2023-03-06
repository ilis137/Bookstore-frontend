import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart } from '../Model/Cart';
import { Order } from '../Model/Order';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  types: string[] = ['Home', 'Office', 'Other'];
  deliveryAddress:FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    pincode: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    type: ['Home'],
  });
  orderSuccess: boolean = false;
  cart:Cart[]=[]
  totalPrice: number=0;
  orders: Order[]=[];
  isLinear=true;
  constructor(private _formBuilder: FormBuilder,private cartService:CartService,private orderService:OrderService) {}

  ngOnInit(){
    this.cartService.getCart().subscribe((result:any)=>{
      this.cart=result.data
      this.calculateTotalPrice()
    })
  }

  placeOrder(){
    let newOrder: Order = {
      name: this.deliveryAddress.get('name')?.value!,
      pincode: this.deliveryAddress.get('pincode')?.value!,
      city: this.deliveryAddress.get('city')?.value!,
      state: this.deliveryAddress.get('state')?.value!,
      password: this.deliveryAddress.get('password')?.value!,
      address: this.deliveryAddress.get('address')?.value!,
      phoneNumber: this.deliveryAddress.get('phoneNumber')?.value!,
      type: this.deliveryAddress.get('type')?.value!,
    };
    this.orderService.placeOrder(newOrder).subscribe((result:any)=>{
      this.orders=result.data;
      this.orderSuccess=true;
      this.cartService.pushToCart([]);
    })

  }

  calculateTotalPrice() { 
    let total=0;   
    this.cart.forEach((cartItem) => {
      total += cartItem.book?.bookPrice!*cartItem.quantity!;
    });
    this.totalPrice=total
  }

  public myError = (controlName: string, errorName: string) => {
    return this.deliveryAddress.controls[controlName].hasError(errorName);
  };
}
