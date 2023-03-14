import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OTPVerificationComponent {
  submitted:boolean=false;
  verified:boolean=true;
  otpGenerated: boolean=true;

  constructor(private userService:UserService,private router:Router){};
   /* Lifecycle hook when component is mounted */
  ngOnInit(){
    this.regeneratedOTP()
  }
  /* 
  enable otp regenration after 30 secs
  */
  regeneratedOTP(){
    setTimeout(() => {
      this.otpGenerated=false;
    }, 30*1000);
  }

  /* called when otp is entered and submiteed.will check if otp is 
  valid or not if valid it will set user verified to true */
  submitOTP(otp:string){
      this.submitted=true;
      this.userService.verifyOTP(otp).subscribe({next:(result:any)=>{
        if(result.data){
          let userJSON=localStorage.getItem("user data");
           let user=JSON.parse(userJSON!);
           user.verified=true;
           localStorage.setItem("user data",JSON.stringify(user));
           this.userService.user.next(user)
           this.router.navigate(["home"])
        }else{
          this.verified=false;
        }
           
      },error:(error:any)=>{
            this.verified=false;
           
      }})  
  }

  regenerateOTP(){
    this.userService.regenerateOTP().subscribe(()=>{
      this.otpGenerated=true;
      this.regeneratedOTP();
    })
  }
}
