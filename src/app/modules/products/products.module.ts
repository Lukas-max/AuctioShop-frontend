import { NgModule } from '@angular/core';
import { ProductService } from './services/product.service';
import { SharedModule } from '../../shared/shared.module';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartService } from './services/cart.service';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductAddComponent } from './components/product-add/product-add.component';

const routes: Routes = [
  { path: 'searchBar/:keyword', component: ProductsComponent },
  { path: 'products/add', component: ProductAddComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'products/:id/:name', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart', component: CartDetailsComponent }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    ProductAddComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProductsComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    ProductAddComponent
  ],
  providers: [
    ProductService,
    CartService
  ]
})
export class ProductsModule { }
