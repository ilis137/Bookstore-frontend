import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../Model/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public search = new BehaviorSubject<string>("");
  baseUrl:string="http://localhost:8080/api/book"
  constructor(private httpClient:HttpClient) { }


  getBooks(){
    return this.httpClient.get(`${this.baseUrl}/view/all`)
  }
 
}
