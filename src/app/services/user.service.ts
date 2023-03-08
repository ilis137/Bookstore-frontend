import {
  HttpClient,
  HttpClientJsonpModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
 
  baseUrl: string = 'http://localhost:8080/api/auth';
  public user = new BehaviorSubject<User>({});
  constructor(private httpClient: HttpClient, private router: Router) {}

  registerUser(user: User) {
    return this.httpClient.post(`${this.baseUrl}/register`, user);
  }

  loginUser(user: User) {
    return this.httpClient.post(`${this.baseUrl}/login`, user);
  }
  getUser(token: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.get(`${this.baseUrl}/retrieve/user`, { headers });
  }
  regenerateOTP() {
    return this.httpClient.get(`${this.baseUrl}/user/generateotp/${this.getToken()}`);
  }
  verifyOTP(otp: string) {   
    return this.httpClient.get(`${this.baseUrl}/user/verify/${this.getToken()}?otp=${otp}`);
  }
  getHeaders(){
    const TOKEN=localStorage.getItem('token'); 
    return new HttpHeaders().set('Authorization', 'Bearer ' + TOKEN);  
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
