import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from '../Model/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  today: Date = new Date();
  registerForm: FormGroup = this._formBuilder.group({
    firstName: ['', [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3),
      Validators.pattern('^[A-Z]{1}[a-zA-Z\\s]{2,}$'),
    ]],
    lastName: ['', [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3),
      Validators.pattern('^[A-Z]{1}[a-zA-Z\\s]{2,}$'),
    ]],
    dob: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder,private router:Router,private userService:UserService) {}

  submitForm() {
    const formattedDate = moment(this.registerForm.get('date')?.value).format(
      'DD MMM YYYY'
    );
    const newUser: User = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      dob: formattedDate,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };
    this.userService.registerUser(newUser).subscribe({next:(result:any)=>{
      const token=result.data
      localStorage.setItem("token",token)
      this.userService.getUser(token).subscribe((result:any)=>{
        this.userService.user.next(result.data);
        localStorage.setItem("user data",JSON.stringify(result.data))
      })
      
      this.router.navigate(["home"])

    },error:(error:any)=>{
      console.log(error)
    }})
  }

  public myError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };
}
