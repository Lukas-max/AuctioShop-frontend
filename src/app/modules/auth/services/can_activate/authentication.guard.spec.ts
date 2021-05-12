import { TestBed } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';
import {AuthModule} from '../../auth.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule, HttpClientTestingModule, RouterTestingModule]
    });
    guard = TestBed.inject(AuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
