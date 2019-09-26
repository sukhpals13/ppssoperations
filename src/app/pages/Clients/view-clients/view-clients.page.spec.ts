import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientsPage } from './view-clients.page';

describe('ViewClientsPage', () => {
  let component: ViewClientsPage;
  let fixture: ComponentFixture<ViewClientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClientsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
