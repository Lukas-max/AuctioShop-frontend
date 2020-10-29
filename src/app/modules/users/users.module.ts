import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLoginGuard } from '../../core/services/can_activate/authentication-login.guard';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'users/register', component: RegisterComponent, canActivate: [ AuthenticationLoginGuard ] },
  { path: 'users/details', component: UserDetailsComponent },
  { path: 'users/orders', component: UsersComponent },
  { path: 'users/orders/:id', component: OrderDetailsComponent }
];

@NgModule({
  declarations: [
    RegisterComponent,
    UserDetailsComponent,
    OrderDetailsComponent,
    UsersComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
