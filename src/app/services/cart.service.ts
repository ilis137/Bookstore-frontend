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
  
  addToCart(cart:Cart){
    const headers= this.getHeaders()
    return this.httpClient.post(`${this.baseUrl}/add`,cart,{headers:headers})
  }
  pushToCart(cart:Cart |Cart[]){
    this.cart.next(cart)
  }
  getCart( ) {
   
    const headers = this.getHeaders() 
    return this.httpClient.get(`${this.baseUrl}/getByUserId`,{headers:headers})
  }

  updateQuantity(cartId:number,quantity:number){
    const headers= this.getHeaders()
    let params = new HttpParams().set('quantity', quantity);
    return this.httpClient.put(`${this.baseUrl}/updateQuantity/${cartId}?quantity=${quantity}`,{},{headers:headers})
  }

  deleteCartItem(cartId:number){
    const headers= this.getHeaders()  
    return this.httpClient.delete(`${this.baseUrl}/delete/${cartId}`,{headers:headers})
  }
  getHeaders(){
    const TOKEN=localStorage.getItem('token'); 
    return new HttpHeaders().set('Authorization', 'Bearer ' + TOKEN);
  }
}
