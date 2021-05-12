// tslint:disable
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JwtLoginComponent} from './jwt-login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {JwtAuthenticationService} from '../../services/jwt_auth/jwt-authentication.service';
import {AuthModule} from '../../auth.module';
import {MessageToastrService} from '../../../../core/services/toastr/message-toastr.service';
import {By} from '@angular/platform-browser';
import {LoadingSpinnerComponent} from '../../../../shared/loading-spinner/loading-spinner.component';
import {of, throwError} from 'rxjs';
import {Router} from '@angular/router';

describe('JwtloginComponent', () => {
  let component: JwtLoginComponent;
  let fixture: ComponentFixture<JwtLoginComponent>;
  let el: DebugElement;
  let jwtAuthService: any;
  let messageToastrService: any;
  let router: any;

  beforeEach(async(() => {
    const jwtAuthSpy = jasmine.createSpyObj('JwtAuthenticationService', ['login']);
    const messageToastrSpy = jasmine.createSpyObj('MessageToastrService', ['success']);
    TestBed.configureTestingModule({
      declarations: [JwtLoginComponent, LoadingSpinnerComponent],
      imports: [
        AuthModule,
        RouterTestingModule.withRoutes([]),
        FormsModule
      ],
      providers: [
        {provide: JwtAuthenticationService, useValue: jwtAuthSpy},
        {provide: MessageToastrService, useValue: messageToastrSpy}
      ]
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JwtLoginComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        jwtAuthService = TestBed.inject(JwtAuthenticationService);
        messageToastrService = TestBed.inject(MessageToastrService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
      });
  }));

  it('should create with proper values', () => {
    expect(component).toBeTruthy();
    expect(component.password).toBeUndefined();
    expect(component.username).toBeUndefined();
    expect(component.loginAttempt).toBeFalse();
    expect(component.loginError).toBeFalse();
  });

  it('should initialize proper view', function() {
    const username = el.query(By.css('input[name="username"]'));
    expect(username.nativeElement).toBeTruthy();

    const password = el.query(By.css('input[name="password"]'));
    expect(password.nativeElement).toBeTruthy();

    const loginButton = el.nativeElement.querySelector('button[type="submit"]');
    expect(loginButton).toBeTruthy();

    const alertTab = el.query(By.css('div[class="alert alert-danger"]'));
    expect(alertTab).toBeFalsy();
  });

  it('should display loading spinner during login attempt', function() {
    let spinner = el.query(By.css('div[class="spinner"]'));
    expect(spinner).toBeFalsy('Should not display spinner div on startup')

    let spinnerComponent = el.query(By.css('app-loading-spinner'));
    expect(spinnerComponent).toBeFalsy('Should not display spinner component div on startup');

    component.loginAttempt = true;
    fixture.detectChanges();

    spinner = el.query(By.css('div[class="spinner"]'));
    expect(spinner).toBeTruthy('Should display spinner div on login attempt');

    spinnerComponent = el.query(By.css('app-loading-spinner'));
    expect(spinnerComponent).toBeTruthy('Should display spinner component div on login attempt');
  });

  it('should hide login form during login attempt and spinner display', function() {
    let form = el.query(By.css('form'));
    expect(form).toBeTruthy('Should display login form on startup.');

    component.loginAttempt = true;
    fixture.detectChanges();

    form = el.query(By.css('form'));
    expect(form).toBeFalsy('Should hide login form on login attempt.');
  });

  it('should properly submit form data', function() {
    jwtAuthService.login.and.returnValue(of(null));
    const navigateSpy = spyOn(router, 'navigate');
    component.username = 'Matylda';
    component.password = 'haslo-matylda';
    expect(component.loginAttempt).toBeFalse();

    const loginButton = el.nativeElement.querySelector('button[type="submit"]');
    loginButton.click();

    expect(component.loginAttempt).toBeTrue();
    expect(jwtAuthService.login).toHaveBeenCalledTimes(1);
    expect(jwtAuthService.login).toHaveBeenCalledWith(component.username, component.password);
    expect(navigateSpy).toHaveBeenCalledWith(['/'])
    expect(messageToastrService.success).toHaveBeenCalledTimes(1)

    const alertTab = el.query(By.css('div[class="alert alert-danger"]'));
    expect(alertTab).toBeFalsy('Should not display error tab when proper login attempt.');
  });

  it('should view error tab on bad login attempt', function() {
    jwtAuthService.login.and.returnValue(throwError({status: 403}));
    const navigateSpy = spyOn(router, 'navigate');
    component.username = 'Matylda';
    component.password = 'haslo-matylda';
    expect(component.loginError).toBeFalse();

    const loginButton = el.nativeElement.querySelector('button[type="submit"]');
    loginButton.click();
    fixture.detectChanges();

    expect(jwtAuthService.login).toHaveBeenCalledTimes(1);
    expect(component.loginError).toBeTrue();
    expect(component.loginAttempt).toBeFalse();
    expect(component.username).toEqual('');
    expect(component.password).toEqual('');

    expect(navigateSpy).toHaveBeenCalledTimes(0);
    expect(messageToastrService.success).toHaveBeenCalledTimes(0)

    const alertTab = el.query(By.css('div[class="alert alert-danger"]'));
    expect(alertTab).toBeTruthy('Should display error tab on bad login attempt');
  });
});














