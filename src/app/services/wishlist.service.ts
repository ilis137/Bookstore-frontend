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
  /* 
  get the wishlist for user
  @method GET
  @return {Observable}
  */
  getWishlist() {
    const headers = this.getHeaders() 
    return this.httpClient.get(`${this.baseUrl}/getByUserId`,{headers:headers})
  }

  /* 
  add the book to wishlist for user
  @method POST
  @return {Observable}
  */
  addToWishlist(wishList:Wishlist) {
    const headers= this.getHeaders()
    return this.httpClient.post(`${this.baseUrl}/add`,wishList,{headers:headers})
  }
/* 
  delete a wishlist item from wishlist
  @method DELETE
  @return {Observable}
  */
  deleteWishlist(wishlistId:number){
    const headers= this.getHeaders()  
    return this.httpClient.delete(`${this.baseUrl}/delete/${wishlistId}`,{headers:headers})
  }

   /*create headers for request,add authorization token
   @return {HttpHeaders} headers
   */
  getHeaders(){
    const TOKEN=localStorage.getItem('token'); 
    return new HttpHeaders().set('Authorization', 'Bearer ' + TOKEN);
  }
}
