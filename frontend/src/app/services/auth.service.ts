import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { APIserviceService } from './apiservice.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivateChild{
redirectUrl = 'customers'
  constructor(private api: APIserviceService, private router: Router) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  
       if (this.isLoggedIn()) return true;

        this.redirectUrl = state.url;

        return this.router.navigate(['login']);
    }

    isLoggedIn(): boolean {
        const token = this.api.getToken();
        return (token && token.length > 0) ? true : false;
    }
 }