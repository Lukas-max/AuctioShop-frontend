import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  active: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProduct();
    });
  }
  private getProduct(){
    const productId: number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(productId).subscribe(data => {
      this.product = data;
      if (this.product.active){
        this.active = 'Produkt dostępny';
      }else {
        this.active = 'Produkt niedostępny';
      }
    });
  }
}
