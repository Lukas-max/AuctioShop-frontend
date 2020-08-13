import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import {MessageToastrService} from '../../../../core/services/message-toastr.service';
import {BasicAuthenticationService} from '../../../../core/services/basic-authentication.service';
import {JwtAuthenticationService} from '../../../../core/services/jwt-authentication.service';

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
  isLogged: boolean;
  // pagination:
  pageSize: number;
  pageNumber: number;
  totalElements: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private messageToastrService: MessageToastrService,
    private basicAuthenticationService: BasicAuthenticationService,
    public jwtAuthenticationService: JwtAuthenticationService) {
  }

  ngOnInit(): void {
    this.pageNumber = 1;
    this.pageSize = 4;
    this.categoryName = 'Wszystkie';
    this.route.paramMap.subscribe(() => {
      this.getProducts();
    });
    this.isLogged = this.basicAuthenticationService.isUserLoggedIn();
  }

  public getProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode){
      this.downloadSearchBarProduct();
    }else {
      this.downloadListProducts();
    }
  }

  private downloadListProducts(){
    const hasProductCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    const hasProductCategoryName: boolean = this.route.snapshot.paramMap.has('name');
    if (hasProductCategoryId && hasProductCategoryName){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      this.categoryName = this.route.snapshot.paramMap.get('name');
      this.productService.getProductByCategoryId(
                this.currentCategoryId, this.pageNumber - 1, this.pageSize)
        .subscribe(this.processResponse());
    }else {
      this.productService.getProducts(this.pageNumber - 1, this.pageSize)
        .subscribe(this.processResponse());
    }
  }

  private downloadSearchBarProduct(){
    const theWord: string = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProductsByName(theWord, this.pageNumber - 1, this.pageSize)
      .subscribe(this.processSearchBarResponse());
  }

  private processResponse(){
    return dataProducts => {
      this.products = dataProducts.content;
      this.pageSize = dataProducts.pageable.pageSize;
      this.totalElements = dataProducts.totalElements;
    };
  }

  private processSearchBarResponse(){
    return dataProducts => {
      this.products = dataProducts.content;
      this.pageSize = dataProducts.pageable.pageSize;
      this.totalElements = dataProducts.totalElements;

      if (this.products.length < 1){
        this.categoryName = 'Nie znaleziono - 404';
      }else {
        this.categoryName = 'Znalezione';
      }
    };
  }

  public changePageSize(pageSize: number){
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.getProducts();
  }

  public deleteProductById(productId: number){
    if (confirm('Czy na pewno chcesz usunąc ten produkt?')){
      this.productService.deleteProductById(productId).subscribe(() => {
        this.getProducts();
        this.messageToastrService.success('Pomyślnie usunięto produkt.');
      });
    }
  }
}
