// tslint:disable
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckoutComponent} from './checkout.component';
import {DebugElement} from '@angular/core';
import {ProductsModule} from '../../products.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MessageToastrService} from '../../../../core/services/toastr/message-toastr.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CartService} from '../../services/cart.service';
import {of, Subject} from 'rxjs';
import {OrderService} from '../../services/order.service';
import {JwtAuthenticationService} from '../../../auth/services/jwt_auth/jwt-authentication.service';
import {Router} from '@angular/router';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let el: DebugElement;
  let messageToastrService: any;
  let authenticationService: any;
  let orderService: any;
  let cartService: any;
  let priceSubject: Subject<number>;
  let quantitySubject: Subject<number>;
  let router: any;

  beforeEach(async(() => {
    priceSubject = new Subject<number>();
    quantitySubject = new Subject<number>();
    const messageToastrSpy = jasmine.createSpyObj('MessageToastrService', ['success']);
    const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService',
      ['isLoggedIn','isAdminLoggedIn', 'getAuthenticatedUser'])
    const orderServiceSpy = jasmine.createSpyObj('orderService', ['postOrder']);
    const cartServiceSpy = jasmine.createSpyObj('CartService',
      ['getCartFromStorage', 'computeTotals', 'getCartItems', 'clearCart']);
    cartServiceSpy.totalQuantity = quantitySubject;
    cartServiceSpy.totalPrice = priceSubject;

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
        {provide: OrderService, useValue: orderServiceSpy},
        {provide: JwtAuthenticationService, useValue: authenticationServiceSpy}
      ]
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CheckoutComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        messageToastrService = TestBed.inject(MessageToastrService);
        authenticationService = TestBed.inject(JwtAuthenticationService);
        orderService = TestBed.inject(OrderService);
        cartService = TestBed.inject(CartService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly initialize component', function() {
    expect(component.checkoutFormGroup.valid).toBeFalse();
    expect(component.checkoutFormGroup.get('firstName').valid).toBeFalse();
    expect(component.checkoutFormGroup.get('lastName').valid).toBeFalse();
    expect(component.checkoutFormGroup.get('email').valid).toBeFalse();
    expect(component.checkoutFormGroup.get('street').valid).toBeFalse();
    expect(component.checkoutFormGroup.get('houseNumber').valid).toBeFalse();
    expect(component.checkoutFormGroup.get('postalCode').valid).toBeFalse();
    expect(component.checkoutFormGroup.get('city').valid).toBeFalse();

    expect(cartService.computeTotals).toHaveBeenCalledTimes(1);

    expect(component.cartItemDto.length).toEqual(0);
    expect(component.customer).toBeFalsy();
    expect(component.username).toBeFalsy();
    expect(component.subscribeQuantity.closed).toBeFalse();
    expect(component.subscribePrice.closed).toBeFalse();

    const button = el.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should work - firstName form field', function() {
    const firstName = component.checkoutFormGroup.get('firstName');
    let errors = firstName.errors || {};
    expect(firstName.valid).toBeFalsy('firstName should not be valid on startup');
    expect(errors.required).toBeTruthy('firstName field error - should be required')

    firstName.setValue('a');
    errors = firstName.errors || {};
    expect(firstName.valid).toEqual(true);
    expect(firstName.valid).toBeTruthy('should be valid with value');
    expect(errors.required).toBeFalsy('should be false with value');
    expect(firstName.errors).toBeNull();

    const button = el.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should display firstName error window at right time', function() {
    const firstName = component.checkoutFormGroup.get('firstName');
    let firstNameTab = el.nativeElement.querySelector('div[data-form="alert-firstName"]');
    expect(firstNameTab).toBeFalsy();

    firstName.markAsTouched();
    fixture.detectChanges();
    firstNameTab = el.nativeElement.querySelector('div[data-form="alert-firstName"]');
    expect(firstNameTab).toBeTruthy();
    expect(firstNameTab.querySelector('span').textContent).toContain('Pole nie może być puste.');
  });

  it('should work - lastName form field', function() {
    const lastName = component.checkoutFormGroup.get('lastName');
    let errors = lastName.errors || {};
    expect(lastName.valid).toBeFalsy('lastName should not be valid on startup');
    expect(errors.required).toBeTruthy('lastName field error - should be required')

    lastName.setValue('a');
    errors = lastName.errors || {};
    expect(lastName.valid).toEqual(true);
    expect(lastName.valid).toBeTruthy('should be valid with value');
    expect(errors.required).toBeFalsy('should be false with value');
    expect(lastName.errors).toBeNull();

    const button = el.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should display lastName error window at right time', function() {
    const lastName = component.checkoutFormGroup.get('lastName');
    let firstNameTab = el.nativeElement.querySelector('div[data-form="alert-lastName"]');
    expect(firstNameTab).toBeFalsy();

    lastName.markAsTouched();
    fixture.detectChanges();
    firstNameTab = el.nativeElement.querySelector('div[data-form="alert-lastName"]');
    expect(firstNameTab).toBeTruthy();
    expect(firstNameTab.querySelector('span').textContent).toContain('Pole nie może być puste.');
  });

  it('should work - email form field', function() {
    const email = component.checkoutFormGroup.get('email');
    let errors = email.errors || {};
    expect(email.valid).toBeFalsy('email should not be valid on startup');
    expect(errors.required).toBeTruthy('email field error - should be required')

    email.setValue('a');
    errors = email.errors || {};
    expect(email.valid).toBeFalsy()
    expect(errors.required).toBeFalsy('should be false with value');
    expect(errors.pattern).toBeTruthy('email pattern');

    email.setValue('asdd@o2.pl');
    errors = email.errors || {};
    expect(errors.pattern).toBeFalsy();
    expect(email.errors).toBeNull();
    expect(email.valid).toBeTrue();

    const button = el.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should display email alert tab at right time', function() {
    const email = component.checkoutFormGroup.get('email');
    let emailNameTab = el.nativeElement.querySelector('div[data-form="alert-email"]');
    expect(emailNameTab).toBeFalsy();

    email.markAsTouched();
    fixture.detectChanges();
    emailNameTab = el.nativeElement.querySelector('div[data-form="alert-email"]');
    expect(emailNameTab).toBeTruthy();
    expect(emailNameTab.querySelector('span').textContent).toContain('Pole wymagane.');

    email.setValue('asdasd@fd')
    fixture.detectChanges();
    expect(emailNameTab).toBeTruthy();
    expect(emailNameTab.querySelector('span').textContent).toContain('Niepoprawny email');
  });

  it('should work - street form field', function() {
    const street = component.checkoutFormGroup.get('street');
    let errors = street.errors || {};
    expect(street.valid).toBeFalsy('street should not be valid on startup');
    expect(errors.required).toBeTruthy('street field error - should be required')

    street.setValue('a');
    errors = street.errors || {};
    expect(street.valid).toEqual(true);
    expect(street.valid).toBeTruthy('should be valid with value');
    expect(errors.required).toBeFalsy('should be false with value');
    expect(street.errors).toBeNull();

    const button = el.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should display street error tab at right time', function() {
    const street = component.checkoutFormGroup.get('street');
    let firstNameTab = el.nativeElement.querySelector('div[data-form="alert-street"]');
    expect(firstNameTab).toBeFalsy();

    street.markAsTouched();
    fixture.detectChanges();
    firstNameTab = el.nativeElement.querySelector('div[data-form="alert-street"]');
    expect(firstNameTab).toBeTruthy();
    expect(firstNameTab.querySelector('span').textContent).toContain('Pole nie może być puste.');
  });

  it('should work - houseNumber form field', function() {
    const houseNumber = component.checkoutFormGroup.get('houseNumber');
    let errors = houseNumber.errors || {};
    expect(houseNumber.valid).toBeFalsy('houseNumber should not be valid on startup');
    expect(errors.required).toBeTruthy('houseNumber field error - should be required')

    houseNumber.setValue(2);
    errors = houseNumber.errors || {};
    expect(houseNumber.valid).toEqual(true);
    expect(houseNumber.valid).toBeTruthy('should be valid with value');
    expect(errors.required).toBeFalsy('should be false with value');
    expect(houseNumber.errors).toBeNull();

    const button = el.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should display houseNumber alert tab at right time', function() {
    const houseNumber = component.checkoutFormGroup.get('houseNumber');
    let firstNameTab = el.nativeElement.querySelector('div[data-form="alert-houseNumber"]');
    expect(firstNameTab).toBeFalsy();

    houseNumber.markAsTouched();
    fixture.detectChanges();
    firstNameTab = el.nativeElement.querySelector('div[data-form="alert-houseNumber"]');
    expect(firstNameTab).toBeTruthy();
    expect(firstNameTab.querySelector('span').textContent).toContain('Pole nie może być puste.');
  });

  it('should work - postalCode form field', function() {
    const postalCode = component.checkoutFormGroup.get('postalCode');
    let errors = postalCode.errors || {};
    expect(postalCode.valid).toBeFalsy('postalCode should not be valid on startup');
    expect(errors.required).toBeTruthy('postalCode field error - should be required')

    postalCode.setValue('12-123');
    errors = postalCode.errors || {};
    expect(postalCode.valid).toEqual(true);
    expect(postalCode.valid).toBeTruthy('should be valid with value');
    expect(errors.required).toBeFalsy('should be false with value');
    expect(postalCode.errors).toBeNull();

    const button = el.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should display postal code alert tab at right time', function() {
    const postalCode = component.checkoutFormGroup.get('postalCode');
    let firstNameTab = el.nativeElement.querySelector('div[data-form="alert-postalCode"]');
    expect(firstNameTab).toBeFalsy();

    postalCode.markAsTouched();
    fixture.detectChanges();
    firstNameTab = el.nativeElement.querySelector('div[data-form="alert-postalCode"]');
    expect(firstNameTab).toBeTruthy();
    expect(firstNameTab.querySelector('span').textContent).toContain('Pole nie może być puste.');
  });

  it('should work - city form field', function() {
    const city = component.checkoutFormGroup.get('city');
    let errors = city.errors || {};
    expect(city.valid).toBeFalsy('city should not be valid on startup');
    expect(errors.required).toBeTruthy('city field error - should be required')

    city.setValue('a');
    errors = city.errors || {};
    expect(city.valid).toEqual(true);
    expect(city.valid).toBeTruthy('should be valid with value');
    expect(errors.required).toBeFalsy('should be false with value');
    expect(city.errors).toBeNull();

    const button = el.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should display city alert tab at right time', function() {
    const city = component.checkoutFormGroup.get('city');
    let firstNameTab = el.nativeElement.querySelector('div[data-form="alert-city"]');
    expect(firstNameTab).toBeFalsy();

    city.markAsTouched();
    fixture.detectChanges();
    firstNameTab = el.nativeElement.querySelector('div[data-form="alert-city"]');
    expect(firstNameTab).toBeTruthy();
    expect(firstNameTab.querySelector('span').textContent).toContain('Pole nie może być puste.');
  });

  it('submit button should be enabled when form valid', function() {
    const button = el.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();

    component.checkoutFormGroup.get('firstName').setValue('Jaga');
    component.checkoutFormGroup.get('lastName').setValue('Baba');
    component.checkoutFormGroup.get('email').setValue('babajaga@o2.pl');
    component.checkoutFormGroup.get('street').setValue('leśna');
    component.checkoutFormGroup.get('houseNumber').setValue(15);
    component.checkoutFormGroup.get('postalCode').setValue('12-123');
    component.checkoutFormGroup.get('city').setValue('Park Narodowy');
    fixture.detectChanges();
    expect(button.disabled).toBeFalse();
  });

  it('should do', function() {
    const button = el.nativeElement.querySelector('button[type="submit"]');
    orderService.postOrder.and.returnValue(of(null));
    cartService.getCartItems.and.returnValue([
      {
        productId: 1,
        name: 'game1',
        unitPrice: 20,
        productImage: null,
        quantity: 2,
        unitsInStock: 10
      },
      {
        productId: 2,
        name: 'game2',
        unitPrice: 40,
        productImage: null,
        quantity: 1,
        unitsInStock: 2
      }
    ]);
    authenticationService.isLoggedIn.and.returnValue(false);
    authenticationService.isAdminLoggedIn.and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');
    expect(button.disabled).toBeTrue();

    component.checkoutFormGroup.get('firstName').setValue('Jaga');
    component.checkoutFormGroup.get('lastName').setValue('Baba');
    component.checkoutFormGroup.get('email').setValue('babajaga@o2.pl');
    component.checkoutFormGroup.get('street').setValue('leśna');
    component.checkoutFormGroup.get('houseNumber').setValue(15);
    component.checkoutFormGroup.get('postalCode').setValue('12-123');
    component.checkoutFormGroup.get('city').setValue('Park Narodowy');
    fixture.detectChanges();

    expect(button.disabled).toBeFalse();
    button.click();
    expect(orderService.postOrder).toHaveBeenCalledTimes(1);
    expect(messageToastrService.success).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
    // expect(orderService.postOrder).toHaveBeenCalledWith({
    //   cartItems: [{
    //     productId: 1, name: 'game1', unitPrice: 20, quantity: 2
    //   }, {
    //     productId: 2, name: 'game2', unitPrice: 40, quantity: 1
    //   }],
    //   customer: {
    //     firstName: 'Jaga',
    //     lastName: 'Baba',
    //     telephone: '',
    //     email: 'babajaga@o2.pl',
    //     country: '',
    //     street: 'leśna',
    //     houseNumber: 15,
    //     apartmentNumber: '',
    //     postalCode: '12-123',
    //     city: 'Park Narodowy'
    //   },
    //   totalPrice: undefined,
    //   totalQuantity: undefined,
    //   username: undefined,
    //   orderId: undefined,
    //   user: undefined
    // });
  });
});
