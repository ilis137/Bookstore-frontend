import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import {MatBadgeModule} from '@angular/material/badge';
import { HomeComponent } from './home/home.component';
import {MatGridListModule} from '@angular/material/grid-list';

import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { NgxUiLoaderModule,NgxUiLoaderHttpModule } from "ngx-ui-loader";
import { WishlistComponent } from './wishlist/wishlist.component';
import { OTPVerificationComponent } from './otpverification/otpverification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent, 
    CheckoutComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    SearchFilterPipe,
    SortByPipe,
    WishlistComponent,
    OTPVerificationComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,  MatPaginatorModule,
    MatSnackBarModule,
    HttpClientModule,
    MatBadgeModule,MatGridListModule,MatStepperModule,NgxPaginationModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({showForeground:true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
