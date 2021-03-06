/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { ResponseProduct } from '../model/responseProduct';
import { API_URL, PRODUCTS_URL } from '../../../app.consts';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  //get all products, with pagination:
  public fetchProducts(pageNo: number, size: number): Observable<ResponseProduct> {
    const httpOptions = {
      params: {
        'page': pageNo.toString(),
        'size': size.toString()}
    };

    return this.http.get<ResponseProduct>(`${API_URL}/${PRODUCTS_URL}`,
      httpOptions);
  }

  //get one product by its ID:
  public fetchProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/${PRODUCTS_URL}/${id}`);
  }

  // this is used tp fetch products by their category using the categories in the sidebar
  public fetchProductByCategoryId(categoryId: number, pageNo: number, size: number): Observable<Product[]> {
    const httpOptions = {
      params: {
        'page': pageNo.toString(),
        'size': size.toString() }
    };

    return this.http
      .get<Product[]>(`${API_URL}/${PRODUCTS_URL}/category/${categoryId}`,
        httpOptions);
  }

  //search products by name, with pagination:
  public searchProductsByName(keyWord: string, pageNo: number, size: number): Observable<ResponseProduct> {
    const httpOptions = {
      params: {
        'page': pageNo.toString(),
        'size': size.toString() }
    };

    return this.http
      .get<ResponseProduct>(`${API_URL}/${PRODUCTS_URL}/name/${keyWord}`,
        httpOptions);
  }


  //add product from productAddComponent
  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${API_URL}/${PRODUCTS_URL}`, product);
  }

  // update product from productUpdateComponent
  public updateProduct(product: Product) {
    return this.http.put<Product>(`${API_URL}/${PRODUCTS_URL}`, product);
  }

//  delete product by its ID:
  public deleteProductById(productId: number) {
    return this.http.delete(`${API_URL}/${PRODUCTS_URL}/${productId}`);
  }
}
