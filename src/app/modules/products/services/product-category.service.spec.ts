// tslint:disable
import {TestBed} from '@angular/core/testing';

import {ProductCategoryService} from './product-category.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ProductCategory} from '../model/productCategory';
import {API_URL, PRODUCT_CATEGORY_URL} from '../../../app.consts';
import {TESTS_PRODUCT_CATEGORIES} from '../../../shared/services/testUtils';

describe('ProductCategoryService', () => {
  let service: ProductCategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[ProductCategoryService]
    });

    service = TestBed.inject(ProductCategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch product categories', function() {
    service.fetchCategories().subscribe((cat: ProductCategory[]) => {
      expect(cat).toBeTruthy();
      expect(cat.length).toBe(2);

      const category = cat.find( c => c.productCategoryId === 2);
      expect(category.categoryName).toEqual('Gry');
    })

    const req = httpTestingController.expectOne(`${API_URL}/${PRODUCT_CATEGORY_URL}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual("json");
    req.flush(TESTS_PRODUCT_CATEGORIES);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
