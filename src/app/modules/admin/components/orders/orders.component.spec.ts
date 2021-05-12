// tslint:disable
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrdersComponent} from './orders.component';
import {AdminModule} from '../../admin.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DebugElement} from '@angular/core';
import {MessageToastrService} from '../../../../core/services/toastr/message-toastr.service';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let el: DebugElement;
  let messageToastrService: any;

  beforeEach(async(() => {
    const messageToastrSpy = jasmine.createSpyObj('MessageToastrService', ['success', 'error']);
    TestBed.configureTestingModule({
      declarations: [ OrdersComponent ],
      imports: [
        AdminModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [
        {provide: MessageToastrService, useValue: messageToastrSpy}
      ]
    })
    .compileComponents()
      .then(() => {
      fixture = TestBed.createComponent(OrdersComponent);
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
