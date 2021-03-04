import {NgModule} from '@angular/core';
import {RegisterComponent} from './components/register/register.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationLoginGuard} from '../auth/services/can_activate/authentication-login.guard';
import {SingleUserOrdersComponent} from './components/single-user-orders/single-user-orders.component';
import {ItemsPurchasedComponent} from './components/items-purchased/items-purchased.component';
import {OrderAuthenticationGuard} from '../auth/services/can_activate/order-authentication.guard';

const routes: Routes = [
  { path: 'users/register', component: RegisterComponent, canActivate: [ AuthenticationLoginGuard ] },
  { path: 'user/orders/:user_id', component: SingleUserOrdersComponent, canActivate: [ OrderAuthenticationGuard ] },
  { path: 'order_purchase', component: ItemsPurchasedComponent }
];

@NgModule({
  declarations: [
    RegisterComponent,
    SingleUserOrdersComponent,
    ItemsPurchasedComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
