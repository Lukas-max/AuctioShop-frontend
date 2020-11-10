import { TestBed } from '@angular/core/testing';

import { OrderAuthenticationGuard } from './order-authentication.guard';

describe('OrderAuthenticationGuard', () => {
  let guard: OrderAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrderAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
