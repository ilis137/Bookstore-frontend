import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  baseUrl:string="http://localhost:8080/api/auth"
  constructor(private httpClient:HttpClient,private router:Router) { }


  registerUser(user:User){
    return this.httpClient.post(`${this.baseUrl}/register`,user)
  }

  loginUser(user: User) {
    return this.httpClient.post(`${this.baseUrl}/login`,user)
  }
}
