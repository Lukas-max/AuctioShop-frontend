import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserOrdersComponent } from './single-user-orders.component';

describe('SingleUserOrdersComponent', () => {
  let component: SingleUserOrdersComponent;
  let fixture: ComponentFixture<SingleUserOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleUserOrdersComponent ]
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
