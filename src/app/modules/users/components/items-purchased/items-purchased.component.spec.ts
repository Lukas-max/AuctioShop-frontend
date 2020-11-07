import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsPurchasedComponent } from './items-purchased.component';

describe('ItemsPurchasedComponent', () => {
  let component: ItemsPurchasedComponent;
  let fixture: ComponentFixture<ItemsPurchasedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsPurchasedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsPurchasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
