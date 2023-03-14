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
   /* Lifecycle hook when component is mounted .
   will fetch the wishlist for that user
   */
  ngOnInit(){
    this.wishlistService.getWishlist().subscribe((result:any)=>{
      this.wishlist=result.data;
  })
}

  /*
   will remove the wishlist item for that user from the wishlist.
   @param {number} wishlistId,id of wishlist item
   */
  removeFromWishlist(wishlistId:number){
    this.wishlistService.deleteWishlist(wishlistId).subscribe((result:any)=>{
      this.wishlist = this.wishlist.filter(
        (item) => item.wishlistId !== wishlistId
      );
  })
  }
}
