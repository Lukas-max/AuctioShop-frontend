import { NgModule } from '@angular/core';
import { ProductService } from './services/product.service';
import { SharedModule } from '../../shared/shared.module';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  { path: 'searchBar/:keyword', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'products/:id/:name', component: ProductsComponent },
  { path: 'products', component: ProductsComponent }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProductsComponent,
    ProductDetailsComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
