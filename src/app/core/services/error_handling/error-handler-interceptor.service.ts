import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MessageToastrService} from '../toastr/message-toastr.service';
import {JwtAuthenticationService} from '../../../modules/auth/services/jwt_auth/jwt-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private messageToastrService: MessageToastrService, private jwtAuthenticationService: JwtAuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(errorObject => {

      console.log(errorObject);
      this.handleInvalidJwtException(errorObject);
      this.handleCasualException(errorObject);
      this.handleResponseEntityErrors(errorObject);
      this.handleValidationErrors(errorObject);

      return throwError(errorObject);
    }));
  }

  // -----------------------------------------------------------------------------------------------------------------------------//
  // ErrorInterceptor methods:                                                                                                    //
  // -----------------------------------------------------------------------------------------------------------------------------//

  /**
   * This method will catch every unauthorized Json Web Token. If the token expires this exception message from the server will be
   * caught here and dealt with.
   */
  private handleInvalidJwtException(errorObject){
    if (errorObject.status === 401 && errorObject.error.error === `Unauthorized`){
      this.jwtAuthenticationService.logout();
    }
  }

  /**
   * This method will handle casual exceptions. Those that have Object.error.message field on the class.
   * In exception errors with forbidden status won't be displayed. That is during user invalid login. We have another way of informing
   * the user about bad login/credentials than toastr popup.
   */
  private handleCasualException(errorObject){
    if (errorObject.error.message != null && errorObject.status !== 403) {
      this.messageToastrService.error(errorObject.error.message);
    }
  }

  /**
   * This method will handle errors sent by ResponseEntity, like OrderNotFoundException. Frontend architecture should not allow this to
   * happen though.
   */
  private handleResponseEntityErrors(errorObject){
    for (const e of errorObject.error) {
      this.messageToastrService.error(e);
    }
  }

  /**
   * This will handle validation errors during adding a product or updating a product, user register, etc.. In general this error should
   * not occur because this part of application has validators on it's side that match the server side. So it won't be able to send a call
   * that won't match the server side.
   */
  private handleValidationErrors(errorObject){
    errorObject.error.validationErrors.forEach(err => {
      this.messageToastrService.error(err);
    });
  }
}
