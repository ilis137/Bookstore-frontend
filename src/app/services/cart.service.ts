import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../Model/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  baseUrl:string="http://localhost:8080/api/cart"
  
  public cart = new BehaviorSubject<Cart | Cart[]>({});
  constructor(private httpClient:HttpClient) { }
  
  /* 
  posts to cart the new book
   @method POST
    @return Observable
  */
  addToCart(cart:Cart){
    const headers= this.getHeaders()
    return this.httpClient.post(`${this.baseUrl}/add`,cart,{headers:headers})
  }

    /* 
    publishes cart is refreshed
  */
  pushToCart(cart:Cart |Cart[]){
    this.cart.next(cart)
  }

  /* get all items for cart for user.sends the token of the user for user identification in auth headers 
     @method GET
      @return Observable
  */
  getCart( ) {
   
    const headers = this.getHeaders() 
    return this.httpClient.get(`${this.baseUrl}/getByUserId`,{headers:headers})
  }
   /* update cart item quantity for user.sends the token of the user for user identification in auth headers
     @method PUT
     @params {number} cartId 
     @params {number} quantity 
      @return Observable
   */
  updateQuantity(cartId:number,quantity:number){
    const headers= this.getHeaders()
    let params = new HttpParams().set('quantity', quantity);
    return this.httpClient.put(`${this.baseUrl}/updateQuantity/${cartId}?quantity=${quantity}`,{},{headers:headers})
  }
  /* delete cart item quantity for user.sends the token of the user for user identification in auth headers
     @method DELETE
     @params {number} cartId 
      @return Observable
   */
  deleteCartItem(cartId:number){
    const headers= this.getHeaders()  
    return this.httpClient.delete(`${this.baseUrl}/delete/${cartId}`,{headers:headers})
  }

  /*create headers for request,add authorization token 
  @return {HttpHeaders} headers
  */
  getHeaders(){
    const TOKEN=localStorage.getItem('token'); 
    return new HttpHeaders().set('Authorization', 'Bearer ' + TOKEN);
  }
}
