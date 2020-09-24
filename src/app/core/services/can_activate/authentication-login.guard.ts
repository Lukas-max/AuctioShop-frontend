import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {JwtAuthenticationService} from '../jwt_auth/jwt-authentication.service';
import {BasicAuthenticationService} from '../basic_auth/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationLoginGuard implements CanActivate {

  constructor(private jwtAuthenticationService: JwtAuthenticationService,
              private basicAuthenticationService: BasicAuthenticationService) {
  }

  private isLoggedBasic(): boolean {
    return !this.basicAuthenticationService.isLoggedIn();
  }

  private isLoggedJwt(): boolean {
    return !this.jwtAuthenticationService.isLoggedIn();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedJwt();
  }

}
