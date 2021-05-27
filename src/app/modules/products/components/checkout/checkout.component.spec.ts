// tslint:disable
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckoutComponent} from './checkout.component';
import {DebugElement} from '@angular/core';
import {ProductsModule} from '../../products.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MessageToastrService} from '../../../../core/services/toastr/message-toastr.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';
import {CartService} from '../../services/cart.service';
import {of, Subject} from 'rxjs';
import {delay} from 'rxjs/operators';

fdescribe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let el: DebugElement;
  let messageToastrService: any;
  let cartService: any;
  let priceSubject: Subject<number>;
  let quantitySubject: Subject<number>;

  beforeEach(async(() => {
    priceSubject = new Subject<number>();
    quantitySubject = new Subject<number>();
    const messageToastrSpy = jasmine.createSpyObj('MessageToastrService', ['success']);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getCartFromStorage', 'computeTotals']);

    TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [
        ProductsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
      ],
      providers: [
        {provide: MessageToastrService, useValue: messageToastrSpy},
        {provide: CartService, useValue: cartServiceSpy},
      ]
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CheckoutComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        messageToastrService = TestBed.inject(MessageToastrService);
        cartService = TestBed.inject(CartService);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly initialize component', function() {
    component.ngOnInit();
    expect(component.checkoutFormGroup.valid).toBeFalse();
    expect(component.checkoutFormGroup.get('firstName').valid).toBeFalse();
    expect(component.checkoutFormGroup.get('lastName').valid).toBeFalse();
    expect(component.checkoutFormGroup.get('email').valid).toBeFalse();
    expect(component.checkoutFormGroup.get('street').valid).toBeFalse();
    expect(component.checkoutFormGroup.get('houseNumber').valid).toBeFalse();
    expect(component.checkoutFormGroup.get('postalCode').valid).toBeFalse();
    expect(component.checkoutFormGroup.get('city').valid).toBeFalse();

    // spyOnProperty(cartService, 'totalQuantitySubject', 'get').and.returnValue(of(0));
    // spyOnProperty(cartService, 'totalPriceSubject', 'get').and.returnValue(of(0));
    cartService.totalPrice.and.returnValue(priceSubject.asObservable());
    cartService.totalQuantity.and.returnValue(quantitySubject.asObservable());
    // (cartService.totalPrice as jasmine.Spy).and.returnValue(priceSubject.asObservable());
    // (cartService.totalQuantity as jasmine.Spy).and.returnValue(quantitySubject.asObservable());
    expect(component.cartItemDto.length).toEqual(0);
    expect(component.customer).toBeFalsy();
    expect(component.username).toBeFalsy();
    expect(component.subscribeQuantity.closed).toBeFalse();
    expect(component.subscribePrice.closed).toBeFalse();

    const button = el.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });
});













