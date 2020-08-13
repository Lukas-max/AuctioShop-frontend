import { Injectable } from '@angular/core';
import { JwtAuthenticationService } from './jwt-authentication.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthInterceptorService implements HttpInterceptor {

  constructor(private jwtAuthenticationService: JwtAuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.jwtAuthenticationService.getAuthenticatedUser();
    const token = this.jwtAuthenticationService.getAuthenticationToken();

    if (user && token) {
      req = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token
          }
        }
      );
    }
    return next.handle(req);
  }
}
