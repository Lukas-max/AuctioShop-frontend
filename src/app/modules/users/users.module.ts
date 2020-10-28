import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLoginGuard } from '../../core/services/can_activate/authentication-login.guard';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersOrdersComponent } from './components/users-orders/users-orders.component';

const routes: Routes = [
  { path: 'users/register', component: RegisterComponent, canActivate: [ AuthenticationLoginGuard ] },
  { path: 'users/details', component: UserDetailsComponent },
  { path: 'users/orders', component: UsersOrdersComponent }
];

@NgModule({
  declarations: [
    RegisterComponent,
    UserDetailsComponent,
    UsersOrdersComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
