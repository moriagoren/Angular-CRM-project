import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIserviceService } from 'src/app/services/apiservice.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
   
    constructor(private auth: AuthService, private api: APIserviceService, private router: Router ){}

  loggedIn(): boolean{
    return this.auth.isLoggedIn();
  }

  userEmail = this.api.getEmailId()
  renderUserEmail = this.userEmail === null ? '' : this.userEmail
  
  logout(){
    this.api.deleteToken()
    this.router.navigate(['login']).then(()=>{
      window.location.reload()
    });
  }
}
