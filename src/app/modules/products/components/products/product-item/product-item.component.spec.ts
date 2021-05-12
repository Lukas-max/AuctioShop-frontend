// tslint:disable
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductItemComponent} from './product-item.component';
import {AppModule} from '../../../../../app.module';
import {DebugElement} from '@angular/core';
import {TestUtil} from '../../../../../../../test-utils/testUtil';
import {By} from '@angular/platform-browser';
import {JwtAuthenticationService} from '../../../../auth/services/jwt_auth/jwt-authentication.service';
import {CartService} from '../../../services/cart.service';
import {ProductService} from '../../../services/product.service';
import {CartItem} from '../../../model/cartItem';
import {of} from 'rxjs';
import {MessageToastrService} from '../../../../../core/services/toastr/message-toastr.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent,
    fixture: ComponentFixture<ProductItemComponent>,
    el: DebugElement,
    authenticationService: any,
    productService: any,
    cartService: any,
    messageToastrService: any,
    router: any;

  beforeEach(async(() => {
    const authServiceSpy = jasmine.createSpyObj('JwtAuthenticationService', ['isAdminLoggedIn']);
    const prodServiceSpy = jasmine.createSpyObj('ProductService', ['deleteProductById']);
    const cartSpy = jasmine.createSpyObj('CartService', ['addToCart']);
    const toastSpy = jasmine.createSpyObj('MessageToastrService', ['success']);
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes([])],
      providers: [
        {provide: JwtAuthenticationService, useValue: authServiceSpy},
        {provide: CartService, useValue: cartSpy},
        {provide: ProductService, useValue: prodServiceSpy},
        {provide: MessageToastrService, useValue: toastSpy},
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ProductItemComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        authenticationService = TestBed.inject(JwtAuthenticationService);
        productService = TestBed.inject(ProductService);
        cartService = TestBed.inject(CartService);
        messageToastrService = TestBed.inject(MessageToastrService);
        router = TestBed.inject(Router);

        // given
        component.product = TestUtil.getProduct()[0];
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product tab', function() {
    // given
    fixture.detectChanges();
    // when
    const tab = el.queryAll(By.css('.product-box')),
      prodName = el.query(By.css('.product-name')),
      price = el.query(By.css('.product-box span')),
      buyButton = el.query(By.css('.button-buy'));
    // then
    expect(tab).toBeTruthy();
    expect(tab.length).toBe(1);
    expect(prodName.nativeElement.textContent).toContain(component.product.name);
    expect(price.nativeElement.textContent).toEqual('49.99');
    expect(buyButton).toBeTruthy('Could not find buy button.');
  });

  it('should display admin buttons when admin logged', function() {
    // given
    authenticationService.isAdminLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    // when
    const deleteButton = el.query(By.css('.button-delete')),
      updateButton = el.query(By.css('.button-update'));
    expect(deleteButton).toBeTruthy('Could not find delete button');
    expect(updateButton).toBeTruthy('Could not find update button');
  });

  it('should not display admin buttons when admin is not logged in', function() {
    // given
    authenticationService.isAdminLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    // when
    const deleteButton = el.query(By.css('.button-delete')),
      updateButton = el.query(By.css('.button-update'));
    expect(deleteButton).toBeFalsy('Created delete button without admin authority');
    expect(updateButton).toBeFalsy('Created update button without admin authority');
  });

  it('should call addToCart with @Input injected product', function() {
    // given
    fixture.detectChanges();
    const buyButton = el.query(By.css('.button-buy'));
    // when
    buyButton.nativeElement.click();
    // then
    expect(cartService.addToCart).toHaveBeenCalledTimes(1);
    expect(cartService.addToCart).toHaveBeenCalledWith(new CartItem(TestUtil.getProduct()[0]), false);
  });

  it('should generate confirm window when delete button pressed', function() {
    // given
    spyOn(window, 'confirm').and.returnValue(false);
    authenticationService.isAdminLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    const deleteButton = el.query(By.css('.button-delete'));
    // when
    deleteButton.nativeElement.click();
    // then
    expect(window.confirm).toHaveBeenCalledWith('Czy na pewno chcesz usunąc ten produkt?');
  });

  it('should not invoke .deleteProductById when not confirmed', function() {
    // given
    spyOn(window, 'confirm').and.returnValue(false);
    authenticationService.isAdminLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    const deleteButton = el.query(By.css('.button-delete'));
    // when
    deleteButton.nativeElement.click();
    // then
    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(productService.deleteProductById).toHaveBeenCalledTimes(0);
  });

  it('should .deleteProductById when confirmed', function() {
    // given
    spyOn(window, 'confirm').and.returnValue(true);
    authenticationService.isAdminLoggedIn.and.returnValue(true);
    productService.deleteProductById.and.returnValue(of(null));
    fixture.detectChanges();
    const deleteButton = el.query(By.css('.button-delete'));
    // when
    deleteButton.nativeElement.click();
    // then
    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(productService.deleteProductById).toHaveBeenCalledTimes(1);
  });


  it('should call toastr service and router on .deleteProductById', function() {
    // given
    spyOn(window, 'confirm').and.returnValue(true);
    const navigateSpy = spyOn(router, 'navigate');
    authenticationService.isAdminLoggedIn.and.returnValue(true);
    productService.deleteProductById.and.returnValue(of(null));
    fixture.detectChanges();
    const deleteButton = el.query(By.css('.button-delete'));
    // when
    deleteButton.nativeElement.click();
    // then
    expect(messageToastrService.success).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/'])
  });
});
