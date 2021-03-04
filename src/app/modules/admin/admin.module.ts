import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {UserDetailsComponent} from './user-details/user-details.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from '../auth/services/can_activate/authentication.guard';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {OrdersComponent} from './orders/orders.component';

const routes: Routes = [
  { path: 'user/details', component: UserDetailsComponent, canActivate: [ AuthenticationGuard ] },
  { path: 'users/orders', component: OrdersComponent, canActivate: [ AuthenticationGuard ] },
  { path: 'users/orders/:order_id', component: OrderDetailsComponent, canActivate: [ AuthenticationGuard ] }
];

@NgModule({
  declarations: [
    UserDetailsComponent,
    OrderDetailsComponent,
    OrdersComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
