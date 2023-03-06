import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Model/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl: string = 'http://localhost:8080/api/order';
  constructor(private httpClient: HttpClient) {}


  placeOrder(order:Order,) {
    const headers= this.getHeaders()
    return this.httpClient.post(`${this.baseUrl}/placeOrder`,order,{headers:headers})
  }
  getHeaders() {
    const TOKEN = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', 'Bearer ' + TOKEN);
  }
}
