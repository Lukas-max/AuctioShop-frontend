import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import {ProductsModule} from '../../products.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MessageToastrService} from '../../../../core/services/toastr/message-toastr.service';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async(() => {
    const toastSpy = jasmine.createSpyObj('MessageToastrService', ['success']);
    TestBed.configureTestingModule({
      imports: [ProductsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ ProductDetailsComponent ],
      providers: [
        {provide: MessageToastrService, useValue: toastSpy}
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
