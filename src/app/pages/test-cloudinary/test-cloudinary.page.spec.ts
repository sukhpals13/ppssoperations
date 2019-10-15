import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCloudinaryPage } from './test-cloudinary.page';

describe('TestCloudinaryPage', () => {
  let component: TestCloudinaryPage;
  let fixture: ComponentFixture<TestCloudinaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCloudinaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCloudinaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
