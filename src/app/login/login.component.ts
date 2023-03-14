import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../Model/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  
  constructor(private _formBuilder: FormBuilder,private router:Router,private userService:UserService,private snackBar:MatSnackBar) {}
   /* 
  determine errors from controls in the form delivery address
  @param {string} controlName is control name of form control
  @param {string} errorName is validation type  of form control
  */ 
  public myError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  /* 
  method to authenticate the user,called when loginForm is submitted.will
  invoke loginUser service on userService
  */
  login(){
    const user: User = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.userService.loginUser(user).subscribe({next:(result:any)=>{
      console.log(result.data)
      localStorage.setItem("token",result.data)
      this.userService.getUser(result.data).subscribe((result:any)=>{
        this.userService.user.next(result.data);
        localStorage.setItem("user data",JSON.stringify(result.data))
      })
      
      this.router.navigate(["home"])
    },error:(error:any)=>{
      if(error.status==401){
       this.snackBar.open("email or password is invalid", 'ok', {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      })
      }
    }})
  }
}
