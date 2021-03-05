import {NgModule} from '@angular/core';
import {RegisterComponent} from './components/register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationLoginGuard} from '../auth/services/can_activate/authentication-login.guard';
import {SingleUserOrdersComponent} from './components/single-user-orders/single-user-orders.component';
import {ItemsPurchasedComponent} from './components/items-purchased/items-purchased.component';
import {OrderAuthenticationGuard} from '../auth/services/can_activate/order-authentication.guard';
import {SharedModule} from '../../shared/shared.module';

// lazy-loading path: user/
const routes: Routes = [
  {path: 'register', component: RegisterComponent, canActivate: [AuthenticationLoginGuard]},
  {path: 'orders/:user_id', component: SingleUserOrdersComponent, canActivate: [OrderAuthenticationGuard]},
  {path: 'order_purchase', component: ItemsPurchasedComponent}
];

@NgModule({
  declarations: [
    RegisterComponent,
    SingleUserOrdersComponent,
    ItemsPurchasedComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class UsersModule {
}
