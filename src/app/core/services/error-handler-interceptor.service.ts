  import { Injectable } from '@angular/core';
  import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import { MessageToastrService } from './message-toastr.service';

  @Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptorService implements HttpInterceptor{

  constructor(private messageToastrService: MessageToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse){
        this.messageToastrService.error(`Błąd połączenia z serwerem.`);
      }
      return throwError(error);
    }));
  }
}
