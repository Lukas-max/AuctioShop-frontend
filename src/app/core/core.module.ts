import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    SidebarComponent
  ],
  providers: [],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class CoreModule { }
