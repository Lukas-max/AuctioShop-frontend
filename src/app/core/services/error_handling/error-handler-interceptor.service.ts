import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MessageToastrService} from '../toastr/message-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private messageToastrService: MessageToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      console.log(error);
      // This one will catch messages from casual thrown exceptions, except bad login attempt
      // that's why 403 is thrown out.
      // Generally it will catch also global exceptions that contain field message. Like ExceptionMessage class on the server side.
      if (error.error.message != null && error.status !== 403) {
        this.messageToastrService.error(error.error.message);
      }

      // this one will catch global error handling coming from the server:
      for (const e of error.error.validationErrors){
        this.messageToastrService.error(e);
      }

      // this one will catch error messages from ResponseEntity - bad request, etc
      for (const e of error.error) {
        this.messageToastrService.error(e);
      }

      return throwError(error);
    }));
  }
}
