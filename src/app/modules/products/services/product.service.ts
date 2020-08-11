/* tslint:disable */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../model/product';
import {Observable} from 'rxjs';
import {ResponseProduct} from '../model/responseProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {
  }

  //get one product by its ID:
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/product=${id}`);
  }

  //get all products, with pagination:
  getProducts(pageNo: number, size: number): Observable<ResponseProduct[]> {
    return this.http.get<ResponseProduct[]>(`${this.productsUrl}/page=${pageNo}&size=${size}`);
  }

  //search products by name, with pagination:
  searchProductsByName(keyWord: string, pageNo: number, size: number): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.productsUrl}/name=${keyWord}&page=${pageNo}&size=${size}`);
  }

  // this is for searching for products using the sidebar categories
  getProductByCategoryId(categoryId: number, pageNo: number, size: number): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.productsUrl}/getByCategoryId=${categoryId}$page=${pageNo}$size=${size}`);
  }

//  delete product by its ID:
  deleteProductById(productId: number) {
    return this.http.delete(`${this.productsUrl}/product=${productId}`);
  }
}
