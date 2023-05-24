import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIserviceService } from '../services/apiservice.service';
import { User } from '../app.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
 
toDate: Date = new Date()
userLogin = new FormGroup({
email: new FormControl("", [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(256)]),
password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/)])
})
 constructor(private api:APIserviceService, private router: Router, private auth: AuthService){}
 err:string|null|undefined = ''
onSubmit(){
 

 this.api.login(this.userLogin.value).subscribe({
   next: (data: User)=>{
    this.err=''
    console.log(data);
    if(data.token){
      this.api.setToken(data.token)
      this.router.navigate([this.auth.redirectUrl]).then(()=>{
        window.location.reload()
      })
     }
  
  },
     error: (err)=> {
      console.log(err)
       if(this.userLogin.controls.email.errors && this.userLogin.controls.password.errors){
     console.log(this.userLogin.controls.email.errors);
      console.log(this.userLogin.controls.password.errors);
      console.log('errors in email and password');
      this.err = 'Errors in email and password'
  }else if(this.userLogin.controls.email.errors){
 console.log(this.userLogin.controls.email.errors);
 console.log('errors in email');
 this.err = 'Error in email'
 }else if(this.userLogin.controls.password.errors){
 console.log(this.userLogin.controls.password.errors);
 console.log('error in password');
 this.err = 'Error in password'
 }else{
  console.log(this.userLogin.value);
  this.err = 'User is not registered'
 }
    }
  })
  
 }
}
