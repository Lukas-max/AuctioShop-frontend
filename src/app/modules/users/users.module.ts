import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLoginGuard } from '../../core/services/can_activate/authentication-login.guard';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SingleUserOrdersComponent } from './components/single-user-orders/single-user-orders.component';
import { ItemsPurchasedComponent } from './components/items-purchased/items-purchased.component';

const routes: Routes = [
  { path: 'users/register', component: RegisterComponent, canActivate: [ AuthenticationLoginGuard ] },
  { path: 'user/details', component: UserDetailsComponent },
  { path: 'user/orders/:user_id', component: SingleUserOrdersComponent },
  { path: 'users/orders', component: OrdersComponent },
  { path: 'users/orders/:order_id', component: OrderDetailsComponent },
  { path: 'order_purchase', component: ItemsPurchasedComponent }
];

@NgModule({
  declarations: [
    RegisterComponent,
    UserDetailsComponent,
    OrderDetailsComponent,
    OrdersComponent,
    SingleUserOrdersComponent,
    ItemsPurchasedComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
