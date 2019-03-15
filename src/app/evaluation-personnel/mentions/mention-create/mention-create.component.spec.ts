import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionCreateComponent } from './mention-create.component';

describe('MentionCreateComponent', () => {
  let component: MentionCreateComponent;
  let fixture: ComponentFixture<MentionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
