import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationPersonnelComponent } from './evaluation-personnel.component';

describe('EvaluationPersonnelComponent', () => {
  let component: EvaluationPersonnelComponent;
  let fixture: ComponentFixture<EvaluationPersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
