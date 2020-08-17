import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './modules/products/products.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './core/login/login.component';
import { JwtLoginComponent } from './core/jwtlogin/jwt-login.component';
import { UsersModule } from './modules/users/users.module';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: JwtLoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(routes),
    ProductsModule,
    UsersModule,
    HttpClientModule,
    ToastrModule.forRoot({ positionClass: 'toast-custom' }),
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
