import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {ProductsModule} from './modules/products/products.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {AuthModule} from './modules/auth/auth.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


const routes: Routes = [
  { path: 'user', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)},
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(routes),
    ProductsModule,
    HttpClientModule,
    ToastrModule.forRoot({ positionClass: 'toast-custom' }),
    AuthModule,
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
