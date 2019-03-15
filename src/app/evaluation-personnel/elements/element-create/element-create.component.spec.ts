import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementCreateComponent } from './element-create.component';

describe('ElementCreateComponent', () => {
  let component: ElementCreateComponent;
  let fixture: ComponentFixture<ElementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
