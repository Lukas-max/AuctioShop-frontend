import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtAuthenticationService } from '../jwt_auth/jwt-authentication.service';
import { BasicAuthenticationService } from '../basic_auth/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrderAuthenticationGuard implements CanActivate {
  constructor(private jwtAuthenticationService: JwtAuthenticationService,
              private basicAuthenticationService: BasicAuthenticationService,
              private router: Router) {
  }

  private checkIfAdmin(): boolean{
    return this.jwtAuthenticationService.isAdminLoggedIn();
  }

  private getUserId(){
    return this.jwtAuthenticationService.getAuthenticatedUserId();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id: number = + next.paramMap.get('user_id');
    const isTrue = (this.checkIfAdmin() || id === this.getUserId());
    return isTrue === true ? true : this.router.createUrlTree(['/']);
  }
}
