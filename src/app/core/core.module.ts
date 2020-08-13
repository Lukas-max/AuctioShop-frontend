import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductsModule } from '../modules/products/products.module';
import { MessageToastrService } from './services/message-toastr.service';
import { BasicAuthInterceptorService } from './services/basic-auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthenticationService } from './services/basic-authentication.service';
import { LoginComponent } from './login/login.component';
import {JwtAuthenticationService} from './services/jwt-authentication.service';
import { JwtLoginComponent } from './jwtlogin/jwt-login.component';
import {JwtAuthInterceptorService} from './services/jwt-auth-interceptor.service';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    JwtLoginComponent
  ],
  providers: [
    MessageToastrService,
    // BasicAuthenticationService,
    JwtAuthenticationService,
    // { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptorService, multi: true }
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptorService, multi: true }
  ],
  imports: [
    SharedModule,
    RouterModule,
    ProductsModule,
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    JwtLoginComponent
  ]
})
export class CoreModule { }
