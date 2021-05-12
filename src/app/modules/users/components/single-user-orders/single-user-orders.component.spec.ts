import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleUserOrdersComponent} from './single-user-orders.component';
import {AppModule} from '../../../../app.module';

describe('SingleUserOrdersComponent', () => {
  let component: SingleUserOrdersComponent;
  let fixture: ComponentFixture<SingleUserOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
