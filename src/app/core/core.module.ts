import {NgModule} from '@angular/core';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HeaderComponent} from './components/header/header.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {ProductsModule} from '../modules/products/products.module';
import {MessageToastrService} from './services/toastr/message-toastr.service';
import {InfoComponent} from './components/info/info.component';
import {FooterComponent} from './components/footer/footer.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorHandlerInterceptorService} from './services/error_handling/error-handler-interceptor.service';


const routes: Routes = [
  { path: 'info', component: InfoComponent }
];

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    InfoComponent,
    FooterComponent
  ],
  providers: [
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
    FooterComponent
  ]
})
export class CoreModule { }
