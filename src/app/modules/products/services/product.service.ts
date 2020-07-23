import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {
  }
  // tslint:disable-next-line:typedef
  getProducts(){
    return this.http.get<Product[]>(`${this.productsUrl}`);
  }

  // tslint:disable-next-line:typedef
  getProductById(id: number){
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }
}
