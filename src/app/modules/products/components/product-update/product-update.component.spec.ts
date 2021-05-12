import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductUpdateComponent} from './product-update.component';
import {AppModule} from '../../../../app.module';
import {TestUtil} from '../../../../../../test-utils/testUtil';
import {ProductsModule} from '../../products.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MessageToastrService} from '../../../../core/services/toastr/message-toastr.service';

describe('ProductUpdateComponent', () => {
  let component: ProductUpdateComponent;
  let fixture: ComponentFixture<ProductUpdateComponent>;

  beforeEach(async(() => {
    const toastSpy = jasmine.createSpyObj('MessageToastrService', ['success']);
    TestBed.configureTestingModule({
      imports: [ProductsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {provide: MessageToastrService, useValue: toastSpy}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ProductUpdateComponent);
        component = fixture.componentInstance;

        component.product = TestUtil.getProduct()[0];
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
