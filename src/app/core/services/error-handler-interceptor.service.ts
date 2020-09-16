import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MessageToastrService} from './message-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private messageToastrService: MessageToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {

      // this one will catch exception message
      if (error.error.message != null) {
        this.messageToastrService.error(error.error.message);
      }

      // this one will catch messages from ResponseEntity - bad request
      for (const e of error.error) {
        this.messageToastrService.error(e);
      }

      return throwError(error);
    }));
  }
}
