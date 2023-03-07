import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../Model/Cart';
import { Wishlist } from '../Model/Wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl: string = 'http://localhost:8080/api/wishlist';
  

  constructor(private httpClient:HttpClient) { }

  getWishlist() {
    const headers = this.getHeaders() 
    return this.httpClient.get(`${this.baseUrl}/getByUserId`,{headers:headers})
  }
  addToWishlist(wishList:Wishlist) {
    const headers= this.getHeaders()
    return this.httpClient.post(`${this.baseUrl}/add`,wishList,{headers:headers})
  }

  deleteWishlist(wishlistId:number){
    const headers= this.getHeaders()  
    return this.httpClient.delete(`${this.baseUrl}/delete/${wishlistId}`,{headers:headers})
  }
  getHeaders(){
    const TOKEN=localStorage.getItem('token'); 
    return new HttpHeaders().set('Authorization', 'Bearer ' + TOKEN);
  }
}
