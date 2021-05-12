import { TestBed } from '@angular/core/testing';

import { JwtAuthInterceptorService } from './jwt-auth-interceptor.service';
import {AuthModule} from '../../auth.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('JwtAuthInterceptorService', () => {
  let service: JwtAuthInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule, HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(JwtAuthInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
