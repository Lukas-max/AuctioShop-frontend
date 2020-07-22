import { NgModule } from '@angular/core';
import {ProductService} from './services/product.service';
import {SharedModule} from '../../shared/shared.module';
import {ProductsComponent} from './components/products/products.component';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ProductsComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
