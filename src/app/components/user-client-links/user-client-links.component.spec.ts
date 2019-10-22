import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClientLinksComponent } from './user-client-links.component';

describe('UserClientLinksComponent', () => {
  let component: UserClientLinksComponent;
  let fixture: ComponentFixture<UserClientLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserClientLinksComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClientLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
