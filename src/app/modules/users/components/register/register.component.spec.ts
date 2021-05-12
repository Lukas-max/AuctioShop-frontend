// tslint:disable
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {DebugElement} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {MessageToastrService} from '../../../../core/services/toastr/message-toastr.service';
import {UsersService} from '../../services/users.service';
import {CartService} from '../../../products/services/cart.service';
import {MatchValidationService} from '../../../../shared/services/match-validation.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {UsersModule} from '../../users.module';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: DebugElement;
  let messageToastrService: any;
  let userService: any;
  let cartService: any;
  let matchValidationService: any;
  let router: any;

  beforeEach(async(() => {
    const toastSpy = jasmine.createSpyObj('MessageToastrService', ['success']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['createUser'])
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getCartFromStorage'])
    const matchValidationServiceSpy = jasmine.createSpyObj('MatchValidationService', ['validate'])
    TestBed.configureTestingModule({
      imports: [
        UsersModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])],
      declarations: [RegisterComponent],
      providers: [
        {provide: MessageToastrService, useValue: toastSpy},
        {provide: UsersService, useValue: userServiceSpy},
        {provide: CartService, useValue: cartServiceSpy},
        {provide: MatchValidationService, useValue: matchValidationServiceSpy},
      ]
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        messageToastrService = TestBed.inject(MessageToastrService);
        userService = TestBed.inject(UsersService);
        cartService = TestBed.inject(CartService);
        matchValidationService = TestBed.inject(MatchValidationService);
        router = TestBed.inject(Router);

        component.ngOnInit();
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty on startup', function() {
    expect(component.registration.invalid).toBeTruthy('Registration form must be invalid on startup')
    expect(component.registration.get('username').touched).toBeFalse();
    expect(component.registration.get('password').touched).toBeFalse();
    expect(component.registration.get('email').touched).toBeFalse();
    expect(component.registration.get('confirmPassword').touched).toBeFalse();

    const submitButton = el.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('username field test should pass', function() {
    const username = component.registration.controls['username'];
    let checkErrors = username.errors || {};
    expect(username.valid).toBeFalsy('Username field must be invalid on startup')
    expect(checkErrors['required']).toBeTruthy('Username field error');

    username.setValue('aa')
    checkErrors = username.errors || {};
    expect(checkErrors['required']).toBeFalsy();
    expect(checkErrors['minlength']).toBeTruthy();

    username.setValue("Marta");
    checkErrors = username.errors || {};
    expect(checkErrors['required']).toBeFalsy();
    expect(checkErrors['minlength']).toBeFalsy();
    expect(username.valid).toEqual(true);
    expect(username.errors).toBeNull();

    fixture.detectChanges();
    const submitButton = el.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('should display alert window for username at right time', function() {
    const username = component.registration.controls['username'];
    let usernameTab = el.nativeElement.querySelector('div[data-form="alert-username"]');
    expect(usernameTab).toBeFalsy('Should not display alert tab');

    username.markAllAsTouched();
    fixture.detectChanges();
    usernameTab = el.nativeElement.querySelector('div[data-form="alert-username"]');
    expect(usernameTab).toBeTruthy('Should displayalert tab');
    expect(usernameTab.querySelector('span').textContent).toEqual('Nazwa użytkownika jest wymagana.');

    username.setValue('Ma');
    fixture.detectChanges();
    usernameTab = el.nativeElement.querySelector('div[data-form="alert-username"]');
    expect(usernameTab).toBeTruthy('Should minLength alert tab');
    expect(usernameTab.querySelector('span').textContent).toEqual('Pole musi zawierać przynajmniej 3 znaki.');

    username.setValue('Marta');
    fixture.detectChanges();
    usernameTab = el.nativeElement.querySelector('div[data-form="alert-username"]');
    expect(usernameTab).toBeFalsy('Should not display alert tab');
  });

  it('email field test should pass', function() {
    const email = component.registration.controls['email'];
    let checkErrors = email.errors || {};
    expect(email.valid).toBeFalsy();
    expect(checkErrors['required']).toBeTruthy();

    email.setValue('uhfuf@fsd');
    checkErrors = email.errors || {};
    expect(checkErrors['required']).toBeFalsy();
    expect(checkErrors['pattern']).toBeTruthy();

    email.setValue('dobrymail@o2.pl');
    checkErrors = email.errors || {};
    expect(checkErrors['required']).toBeFalsy();
    expect(checkErrors['pattern']).toBeFalsy();
    expect(email.errors).toBeNull();

    fixture.detectChanges();
    const submitButton = el.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('email field should display alert tab when needed', function() {
    const email = component.registration.controls['email'];
    const emailTab = el.query(By.css('input[type="email"]'));
    expect(emailTab.classes['is-invalid'] || null).toBeNull();

    email.markAllAsTouched();
    fixture.detectChanges();
    expect(emailTab.classes['is-invalid']).toBeTrue();
  });

  it('password field test should pass', function() {
    const password = component.registration.controls['password'];
    let checkErrors = password.errors || {};
    expect(password.valid).toBeFalsy()
    expect(checkErrors['required']).toBeTruthy();

    password.setValue('bb')
    checkErrors = password.errors || {};
    expect(checkErrors['required']).toBeFalsy();
    expect(checkErrors['minlength']).toBeTruthy();

    password.setValue("UserPassword");
    checkErrors = password.errors || {};
    expect(checkErrors['required']).toBeFalsy();
    expect(checkErrors['minlength']).toBeFalsy();
    expect(password.valid).toEqual(true);
    expect(password.errors).toBeNull();

    fixture.detectChanges();
    const submitButton = el.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('should display alert window for password at right time', function() {
    const username = component.registration.controls['password'];
    let usernameTab = el.nativeElement.querySelector('div[data-form="alert-password"]');
    expect(usernameTab).toBeFalsy('Should not display alert tab for password');

    username.markAllAsTouched();
    fixture.detectChanges();
    usernameTab = el.nativeElement.querySelector('div[data-form="alert-password"]');
    expect(usernameTab).toBeTruthy('Should display alert tab');
    expect(usernameTab.querySelector('span').textContent).toEqual('Hasło jest wymagane.');

    username.setValue('us');
    fixture.detectChanges();
    usernameTab = el.nativeElement.querySelector('div[data-form="alert-password"]');
    expect(usernameTab).toBeTruthy('Should displayalert tab');
    expect(usernameTab.querySelector('span').textContent).toEqual('Pole musi zawierać przynajmniej 3 znaki.');

    username.setValue('user');
    fixture.detectChanges();
    usernameTab = el.nativeElement.querySelector('div[data-form="alert-password"]');
    expect(usernameTab).toBeFalsy('Should not display alert tab');
  });

  it('confirmPassword field test should pass', function() {
    const confirmPassword = component.registration.controls['confirmPassword'];
    let checkErrors = confirmPassword.errors || {};
    expect(confirmPassword.valid).toBeFalsy()
    expect(checkErrors['required']).toBeTruthy();

    confirmPassword.setValue('nowe haslo');
    checkErrors = confirmPassword.errors || {};
    expect(checkErrors['required']).toBeFalsy();
    expect(confirmPassword.valid).toBeTruthy();
    expect(confirmPassword.errors).toBeNull();

    fixture.detectChanges();
    const submitButton = el.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('should display alert tab for confirm password', function() {
    const confirmPassword = component.registration.controls['confirmPassword'];
    let passwordTab = el.nativeElement.querySelector('div[data-form="alert-confirm-password"]');
    expect(passwordTab).toBeFalsy('Should not display alert tab for confirm');

    confirmPassword.markAllAsTouched();
    fixture.detectChanges();
    passwordTab = el.nativeElement.querySelector('div[data-form="alert-confirm-password"]');
    expect(passwordTab).toBeTruthy('Should display alert tab');
    expect(passwordTab.querySelector('span').textContent).toEqual('Hasło jest wymagane.');
  });

  it('submit button should be enabled after form completion', function() {
    matchValidationService.validate.and.returnValue(true);
    const submitButton = el.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();

    component.registration.controls['username'].setValue('Marta');
    component.registration.controls['email'].setValue('marta@o2.pl');
    component.registration.controls['password'].setValue('krowa111');
    component.registration.controls['confirmPassword'].setValue('krowa111');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalse();
  });

  it('should submit the form if form is valid', function() {
    matchValidationService.validate.and.returnValue(true);
    const navigateSpy = spyOn(router, 'navigate');
    userService.createUser.and.returnValue(of(null));
    expect(component.registration.valid).toBeFalsy();

    component.registration.controls['username'].setValue('Marta');
    component.registration.controls['email'].setValue('marta@o2.pl');
    component.registration.controls['password'].setValue('krowa111');
    component.registration.controls['confirmPassword'].setValue('krowa111');
    fixture.detectChanges();
    expect(component.registration.valid).toBeTruthy();
    expect(component.registration.errors).toBeNull();

    const submitButton = el.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeFalse();

    submitButton.click();
    expect(userService.createUser).toHaveBeenCalledTimes(1);
    expect(userService.createUser).toHaveBeenCalledWith({
      username: 'Marta', email: 'marta@o2.pl', password: 'krowa111'
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
    expect(messageToastrService.success).toHaveBeenCalledTimes(1);
  });
});
