import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductCategory} from '../model/productCategory';
import {Observable} from 'rxjs';
import {API_URL} from '../../../app.consts';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) { }

  // this is for searching for products using the sidebar categories
  fetchCategories(): Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(`${API_URL}/api/product_category`);
  }
}
