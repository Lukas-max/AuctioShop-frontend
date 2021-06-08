// tslint:disable
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartDetailsComponent} from './cart-details.component';
import {MessageToastrService} from '../../../../core/services/toastr/message-toastr.service';
import {ProductsModule} from '../../products.module';
import {DebugElement} from '@angular/core';
import {Subject} from 'rxjs';
import {CartService} from '../../services/cart.service';

describe('CartDetailsComponent', () => {
  let component: CartDetailsComponent;
  let fixture: ComponentFixture<CartDetailsComponent>;
  let el: DebugElement;
  let messageToastrService: any;
  let cartService: any;
  let priceSubject: Subject<number>;
  let quantitySubject: Subject<number>;

  beforeEach(async(() => {
    priceSubject = new Subject<number>();
    quantitySubject = new Subject<number>();
    const cartServiceSpy = jasmine.createSpyObj('CartService',
      ['getCartItems', 'computeTotals', 'addToCart', 'decrementItem', 'removeItem', 'getCartFromStorage']);
    cartServiceSpy.totalPrice = priceSubject;
    cartServiceSpy.totalQuantity = quantitySubject;
    const messageToastrSpy = jasmine.createSpyObj('MessageToastrService', ['success']);

    TestBed.configureTestingModule({
      declarations: [CartDetailsComponent],
      imports: [
        ProductsModule
      ],
      providers: [
        {provide: MessageToastrService, useValue: messageToastrSpy},
        {provide: CartService, useValue: cartServiceSpy}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CartDetailsComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        messageToastrService = TestBed.inject(MessageToastrService);
        cartService = TestBed.inject(CartService);
        fixture.detectChanges();
      });
  }));

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    // expect(cartService.getCartFromStorage).toHaveBeenCalledTimes(1);
    // expect(cartService.getCartItems).toHaveBeenCalledTimes(1);
    // expect(cartService.computeTotals).toHaveBeenCalledTimes(1);
  });
});
















