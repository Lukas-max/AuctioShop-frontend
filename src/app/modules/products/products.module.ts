import { NgModule } from '@angular/core';
import {ProductService} from './services/product.service';
import {SharedModule} from '../../shared/shared.module';
import {ProductsComponent} from './components/products/products.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'products/:id/:name', component: ProductsComponent},
  { path: 'products', component: ProductsComponent }
];

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProductsComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
