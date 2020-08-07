import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductsModule } from '../modules/products/products.module';
import { MessageToastrService } from './services/message-toastr.service';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    SidebarComponent
  ],
  providers: [
    MessageToastrService
  ],
  imports: [
    SharedModule,
    RouterModule,
    ProductsModule
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class CoreModule { }
