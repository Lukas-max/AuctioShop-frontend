import { TestBed } from '@angular/core/testing';

import { MessageToastrService } from './message-toastr.service';
import {AppModule} from '../../../app.module';

describe('MessageToastrService', () => {
  let service: MessageToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = TestBed.inject(MessageToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
