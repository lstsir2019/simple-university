import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantAdminComponent } from './etudiant-admin.component';

describe('EtudiantAdminComponent', () => {
  let component: EtudiantAdminComponent;
  let fixture: ComponentFixture<EtudiantAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtudiantAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtudiantAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
