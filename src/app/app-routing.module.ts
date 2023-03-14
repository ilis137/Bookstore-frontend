import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OTPVerificationComponent } from './otpverification/otpverification.component';
import { RegisterComponent } from './register/register.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '',
    component:DashboardComponent,
    pathMatch: 'full'
  },

  {
    path: 'home',
    component:HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'cart',
    component:CartComponent,
    pathMatch: 'full'
  },
  {
    path: 'checkout',
    component:CheckoutComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component:LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component:RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'verify/otp',
    component:OTPVerificationComponent,
    pathMatch: 'full'
  },
  {
    path: 'wishlist',
    component:WishlistComponent,
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
