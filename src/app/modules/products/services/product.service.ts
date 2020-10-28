/* tslint:disable */
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../model/product';
import {Observable} from 'rxjs';
import {ResponseProduct} from '../model/responseProduct';
import {API_URL} from '../../../app.consts';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  constructor(private http: HttpClient) {
  }

  //get all products, with pagination:
  public getProducts(pageNo: number, size: number): Observable<ResponseProduct[]> {
    const httpOptions = {
      params: {
        'page': pageNo.toString(),
        'size': size.toString()}
    };

    return this.http.get<ResponseProduct[]>(`${API_URL}/${this.productsUrl}`,
      httpOptions);
  }

  //get one product by its ID:
  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/${this.productsUrl}/${id}`);
  }

  // this is used tp fetch products by their category using the categories in the sidebar
  public getProductByCategoryId(categoryId: number, pageNo: number, size: number): Observable<Product[]> {
    const httpOptions = {
      params: {
        'categoryId': categoryId.toString() ,
        'page': pageNo.toString(),
        'size': size.toString() }
    };

    return this.http
      .get<Product[]>(`${API_URL}/${this.productsUrl}/getByCategoryId`,
        httpOptions);
  }

  //search products by name, with pagination:
  public searchProductsByName(keyWord: string, pageNo: number, size: number): Observable<Product[]> {
    const httpOptions = {
      params: {
        'keyWord': keyWord.toString() ,
        'page': pageNo.toString(),
        'size': size.toString() }
    };

    return this.http
      .get<Product[]>(`${API_URL}/${this.productsUrl}/name`,
        httpOptions);
  }


  //add product from productAddComponent
  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${API_URL}/${this.productsUrl}`, product);
  }

  // update product from productUpdateComponent
  public updateProduct(product: Product) {
    return this.http.put<Product>(`${API_URL}/${this.productsUrl}`, product);
  }

//  delete product by its ID:
  public deleteProductById(productId: number) {
    return this.http.delete(`${API_URL}/${this.productsUrl}/product/${productId}`);
  }
}
