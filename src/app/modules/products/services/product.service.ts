import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.productsUrl}`);
  }
  getProductByCategoryId(categoryId: number): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.productsUrl}/getByCategoryId/${categoryId}`);
  }
}
