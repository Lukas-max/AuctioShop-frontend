import { TestBed } from '@angular/core/testing';

import { AuthenticationLoginGuard } from './authentication-login.guard';

describe('AuthenticationLoginGuard', () => {
  let guard: AuthenticationLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticationLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
