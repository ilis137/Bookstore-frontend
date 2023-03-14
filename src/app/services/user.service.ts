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
  public loggedOut = new BehaviorSubject<boolean>(false);
  constructor(private httpClient: HttpClient, private router: Router) {}
  
  /* create user by registering the user dto to user service
   @method POST
   @param  {User} user
   @return Observable
  */
  registerUser(user: User) {
    return this.httpClient.post(`${this.baseUrl}/register`, user);
  }
  /* login user by sending user dto to user service
   @method POST
   @param  {User} user
   @return Observable
  */
  loginUser(user: User) {
    return this.httpClient.post(`${this.baseUrl}/login`, user);
  }

  /* get user details
   @method POST
   @param  {string} token
   @return Observable
  */
  getUser(token: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.get(`${this.baseUrl}/retrieve/user`, { headers });
  }

  /* 
    regenerate the otp of user by sending user token in headers
    @return Observable
  */
  regenerateOTP() {
    return this.httpClient.get(`${this.baseUrl}/user/generateotp/${this.getToken()}`);
  }

  /* 
    verify validity of otp
    @return Observable
  */
  verifyOTP(otp: string) {   
    return this.httpClient.get(`${this.baseUrl}/user/verify/${this.getToken()}?otp=${otp}`);
  }

   /*create headers for request,add authorization token
   @return {HttpHeaders} headers
   */
  getHeaders(){
    const TOKEN=localStorage.getItem('token'); 
    return new HttpHeaders().set('Authorization', 'Bearer ' + TOKEN);  
  }
   /* get token from localstrorate
   @return {string} token
   */
  getToken(){
    return localStorage.getItem('token');
  }
  /* publish logged out event */
  logout(){
     this.loggedOut.next(true);
  }
}
