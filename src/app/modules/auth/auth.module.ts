import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {JwtLoginComponent} from './components/jwtlogin/jwt-login.component';
import {RouterModule} from '@angular/router';
import {AuthenticationLoginGuard} from './services/can_activate/authentication-login.guard';
import {JwtAuthenticationService} from './services/jwt_auth/jwt-authentication.service';
import {AuthenticationGuard} from './services/can_activate/authentication.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtAuthInterceptorService} from './services/jwt_auth/jwt-auth-interceptor.service';


@NgModule({
  declarations: [
    JwtLoginComponent
  ],
  providers: [
    JwtAuthenticationService,
    AuthenticationGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptorService, multi: true }
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: JwtLoginComponent, canActivate: [AuthenticationLoginGuard] }])
  ]
})
export class AuthModule { }
