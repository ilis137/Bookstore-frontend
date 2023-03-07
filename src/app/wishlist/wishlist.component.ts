import { Component } from '@angular/core';
import { Wishlist } from '../Model/Wishlist';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  
  wishlist:Wishlist[]=[];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(){
    this.wishlistService.getWishlist().subscribe((result:any)=>{
      this.wishlist=result.data;
  })
}
  removeFromWishlist(wishlistId:number){
    this.wishlistService.deleteWishlist(wishlistId).subscribe((result:any)=>{
      this.wishlist = this.wishlist.filter(
        (item) => item.wishlistId !== wishlistId
      );
  })
  }
}
