import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaculteMandatComponent } from './faculte-mandat.component';

describe('FaculteMandatComponent', () => {
  let component: FaculteMandatComponent;
  let fixture: ComponentFixture<FaculteMandatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaculteMandatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaculteMandatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
