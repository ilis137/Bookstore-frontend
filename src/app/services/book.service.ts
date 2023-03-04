import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../Model/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  baseUrl:string="http://localhost:8080/api/book"
  constructor(private httpClient:HttpClient,private router:Router) { }


  getBooks(){
    return this.httpClient.get(`${this.baseUrl}/view/all`)
  }

}
