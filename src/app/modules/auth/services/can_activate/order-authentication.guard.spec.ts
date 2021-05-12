import { TestBed } from '@angular/core/testing';

import { OrderAuthenticationGuard } from './order-authentication.guard';
import {AuthModule} from '../../auth.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('OrderAuthenticationGuard', () => {
  let guard: OrderAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule, HttpClientTestingModule, RouterTestingModule],
    });
    guard = TestBed.inject(OrderAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
