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

      // this one will catch messages from casual thrown exceptions:
      if (error.error.message != null) {
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
