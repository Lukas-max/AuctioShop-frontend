import { TestBed } from '@angular/core/testing';

import { JwtAuthenticationService } from './jwt-authentication.service';
import {AuthModule} from '../../auth.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('JwtAuthenticationService', () => {
  let service: JwtAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule, HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(JwtAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
