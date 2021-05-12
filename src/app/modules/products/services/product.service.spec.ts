// tslint:disable

import {TestBed} from '@angular/core/testing';

import {ProductService} from './product.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {API_URL, PRODUCTS_URL} from '../../../app.consts';
import {ResponseProduct} from '../model/responseProduct';
import {TestUtil} from '../../../../../test-utils/testUtil';

describe('ProductService', () => {
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

  it('should fetch product response', function() {
    const pageNumber = 0;
    const pageSize = 2;
    service.fetchProducts(pageNumber, pageSize).subscribe((data: ResponseProduct) => {
      expect(data).toBeTruthy();
      expect(data.content.product.length).toBe(2);
      expect(data.content.product[0].productId).toBe(1);
      expect(data.content.product[0].sku).toBe('111');
      expect(data.content.product[0].name).toBe(`God of War 4`);
      expect(data.content.product[0].unitPrice).toBe(49.99);
      expect(data.content.product[0].unitsInStock).toBe(5);
      expect(data.content.product[0].productImage).toBe('imageUrl');
      expect(data.content.product[0].description).toBe(`To jest test opisu gry. To jest test opisu gry. To jest test opisu gry. `);
      expect(data.content.product[0].active).toBe(true);
      expect(data.content.product[0].productCategoryId).toBe(2);
      expect(data.content.product[0].dateTimeCreated).toBeInstanceOf(Date)
    });

    const req = httpTestingController.expectOne(req => req.url == `${API_URL}/${PRODUCTS_URL}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe(pageNumber.toString());
    expect(req.request.params.get('size')).toBe(pageSize.toString())
    req.flush(TestUtil.getResponseProduct(pageNumber, pageSize)[0]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});













