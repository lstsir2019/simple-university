import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationNavbarComponent } from './evaluation-navbar.component';

describe('EvaluationNavbarComponent', () => {
  let component: EvaluationNavbarComponent;
  let fixture: ComponentFixture<EvaluationNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
