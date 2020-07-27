import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductCategory} from '../model/productCategory';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private categoriesUrl = 'http://localhost:8080/api/product_category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(`${this.categoriesUrl}/categories`);
  }
}
