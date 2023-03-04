import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  types: string[] = ['Home', 'Office', 'Other'];
  deliveryAddress = this._formBuilder.group({
    name: ['', Validators.required],
    pincode: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    type: ['', Validators.required],
  });
  orderSuccess: boolean = false;
  constructor(private _formBuilder: FormBuilder) {}
}
