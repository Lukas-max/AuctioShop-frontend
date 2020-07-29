import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  currentCategoryId: number;
  categoryName: string;
  searchMode: boolean;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.categoryName = 'Wszystkie';
    this.route.paramMap.subscribe(() => {
      this.getProducts();
    });
  }
  private getProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode){
      this.downloadSearchedProduct();
    }else {
      this.downloadListProducts();
    }
  }
  private downloadListProducts(){
    const hasProductCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    const hasProductCategoryName: boolean = this.route.snapshot.paramMap.has('name');
    if (hasProductCategoryName){
      this.categoryName = this.route.snapshot.paramMap.get('name');
    }
    if (hasProductCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      this.productService.getProductByCategoryId(this.currentCategoryId).subscribe( dataProducts => {
        this.products = dataProducts;
      });
    }else {
      this.productService.getProducts().subscribe(dataProducts => {
        this.products = dataProducts;
      });
    }
  }
  private downloadSearchedProduct(){
    const theWord: string = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProductsByName(theWord).subscribe(searchedProducts => {
      this.products = searchedProducts;
      if (this.products.length === 0){
        this.categoryName = 'Nie znaleziono - 404';
      }else {
        this.categoryName = 'Znalezione';
      }
    });
  }
}
