/* tslint:disable */
import {TestBed} from '@angular/core/testing';

import {OrderService} from './order.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('OrderService', () => {
  let service: OrderService;
  let router: any;

  beforeEach(() => {
    const orderServiceSpy = jasmine.createSpyObj('OrderService', []);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: OrderService, useValue: orderServiceSpy}
      ]
    })
      .compileComponents()
      .then(() => {
        router = TestBed.inject(Router);
        service = TestBed.inject(OrderService);
      });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
