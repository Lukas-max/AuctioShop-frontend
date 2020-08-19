/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { ResponseProduct } from '../model/responseProduct';
import { API_URL } from '../../../app.consts';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  constructor(private http: HttpClient) {
  }

  //get one product by its ID:
  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/${this.productsUrl}/product=${id}`);
  }

  //get all products, with pagination:
  public getProducts(pageNo: number, size: number): Observable<ResponseProduct[]> {
    return this.http.get<ResponseProduct[]>(`${API_URL}/${this.productsUrl}/page=${pageNo}&size=${size}`);
  }

  //search products by name, with pagination:
  public searchProductsByName(keyWord: string, pageNo: number, size: number): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${API_URL}/${this.productsUrl}/name=${keyWord}&page=${pageNo}&size=${size}`);
  }

  // this is for searching for products using the sidebar categories
  public getProductByCategoryId(categoryId: number, pageNo: number, size: number): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${API_URL}/${this.productsUrl}/getByCategoryId=${categoryId}$page=${pageNo}$size=${size}`);
  }

  //add product from productAddComponent
  public addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${API_URL}/${this.productsUrl}`, product);
  }

  // update product from productUpdateComponent
  public updateProduct(product: Product){
    return this.http.put<Product>(`${API_URL}/${this.productsUrl}`, product);
  }

//  delete product by its ID:
  public deleteProductById(productId: number) {
    return this.http.delete(`${API_URL}/${this.productsUrl}/product=${productId}`);
  }
}
