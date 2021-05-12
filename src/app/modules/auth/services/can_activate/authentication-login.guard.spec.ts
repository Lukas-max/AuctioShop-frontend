import { TestBed } from '@angular/core/testing';

import { AuthenticationLoginGuard } from './authentication-login.guard';
import {AuthModule} from '../../auth.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthenticationLoginGuard', () => {
  let guard: AuthenticationLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule, HttpClientTestingModule, RouterTestingModule]
    });
    guard = TestBed.inject(AuthenticationLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
