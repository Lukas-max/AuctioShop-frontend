import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckoutComponent} from './checkout.component';
import {DebugElement} from '@angular/core';
import {ProductsModule} from '../../products.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MessageToastrService} from '../../../../core/services/toastr/message-toastr.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let el: DebugElement;
  let messageToastrService: any;

  beforeEach(async(() => {
    const messageToastrSpy = jasmine.createSpyObj('MessageToastrService', ['success']);
    TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [
        ProductsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
      ],
      providers: [
        {provide: MessageToastrService, useValue: messageToastrSpy},
      ]
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CheckoutComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        messageToastrService = TestBed.inject(MessageToastrService);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
