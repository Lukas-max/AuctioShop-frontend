import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProductsModule } from '../modules/products/products.module';
import { MessageToastrService } from './services/toastr/message-toastr.service';
import { BasicAuthInterceptorService } from './services/basic_auth/basic-auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthenticationService } from './services/basic_auth/basic-authentication.service';
import { LoginComponent } from './components/login/login.component';
import { JwtAuthenticationService } from './services/jwt_auth/jwt-authentication.service';
import { JwtLoginComponent } from './components/jwtlogin/jwt-login.component';
import { JwtAuthInterceptorService } from './services/jwt_auth/jwt-auth-interceptor.service';
import { ErrorHandlerInterceptorService } from './services/error_handling/error-handler-interceptor.service';
import { AuthenticationGuard } from './services/can_activate/authentication.guard';
import { InfoComponent } from './components/info/info.component';
import { FooterComponent } from './components/footer/footer.component';


const routes: Routes = [
  { path: 'login', component: JwtLoginComponent },
  { path: 'info', component: InfoComponent }
];

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    LoginComponent,
    JwtLoginComponent,
    InfoComponent,
    FooterComponent
  ],
  providers: [
    // BasicAuthenticationService,
    // { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptorService, multi: true }
    MessageToastrService,
    JwtAuthenticationService,
    AuthenticationGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptorService, multi: true }
  ],
  imports: [
    SharedModule,
    RouterModule,
    ProductsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    LoginComponent,
    JwtLoginComponent,
    FooterComponent
  ]
})
export class CoreModule { }
