// tslint:disable

import {TestBed} from '@angular/core/testing';

import {ProductService} from './product.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {API_URL, PRODUCTS_URL} from '../../../app.consts';
import {ResponseProduct} from '../model/responseProduct';
import {TESTS_PRODUCT_ID8, TESTS_PRODUCT_KEYWORD, TESTS_PRODUCTS} from '../../../shared/services/testUtils';

fdescribe('ProductService', () => {
  let service: ProductService, httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchProducts(pageNo: number, size: number) - should fetch product response', function() {
    const pageNumber = 0;
    const pageSize = 8;
    service.fetchProducts(pageNumber, pageSize).subscribe((data: ResponseProduct) => {
      expect(data).toBeTruthy();
      expect(data.totalPages).toEqual(3);
      expect(data.totalElements).toEqual(18);
      expect(data.content[0].productId).toBe(3);
      expect(data.content[0].sku).toBe('333');
      expect(data.content[0].name).toBe(`Ghost Of Tsushima`);
      expect(data.content[0].unitPrice).toBe(249.99);
      expect(data.content[0].unitsInStock).toBe(50);
      expect(data.content[0].productImage).toBe('image');
      expect(data.content[0].description).toBe(`To jest test opisu gry. To jest test opisu gry. To jest test opisu gry. `);
      expect(data.content[0].active).toBe(true);
    });

    const req = httpTestingController.expectOne(req => req.url == `${API_URL}/${PRODUCTS_URL}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe(pageNumber.toString());
    expect(req.request.params.get('size')).toBe(pageSize.toString())
    req.flush(TESTS_PRODUCTS);
  });

  it('fetchProductById(id: number) - should fetch product', function() {
    const id = 8;
    service.fetchProductById(id).subscribe((data) => {
      expect(data.productId).toEqual(8);
      expect(data.name).toEqual("Fallout 2")
    });

    const req = httpTestingController.expectOne(`${API_URL}/${PRODUCTS_URL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(TESTS_PRODUCT_ID8);
  });

  it('searchProductsByName(keyWord: string, pageNo: number, size: number) - should fetch data', function() {
    const str = 'war';
    const pageNumber = 0;
    const pageSize = 8;
    service.searchProductsByName(str, pageNumber, pageSize).subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.content[0].name).toBe(`God of War 4`);
    });

    const req = httpTestingController.expectOne(req => req.url == `${API_URL}/${PRODUCTS_URL}/name/${str}`);
    expect(req.request.method).toEqual('GET');
    req.flush(TESTS_PRODUCT_KEYWORD);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
