import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersToPickPage } from './orders-to-pick.page';

describe('OrdersToPickPage', () => {
  let component: OrdersToPickPage;
  let fixture: ComponentFixture<OrdersToPickPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersToPickPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersToPickPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
