import { Component } from '@angular/core';
import { Book } from '../Model/Book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   public sortBy:string="Relevance";
   public bookLength:number=125
   public sortByOptions:string[]=["Relevance","Price:Low to High","Price:High to Low"]
   books !: Book[];
   public sort(){

   }
}
