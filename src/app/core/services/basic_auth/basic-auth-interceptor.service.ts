import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptorService implements HttpInterceptor{

  constructor(private basicAuthenticationService: BasicAuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.basicAuthenticationService.getAuthenticatedUser();
    const basicAuthHeader = this.basicAuthenticationService.getAuthenticationToken();

    if (user && basicAuthHeader){
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: basicAuthHeader
        }
      });
    }

    return next.handle(req);
  }
}
