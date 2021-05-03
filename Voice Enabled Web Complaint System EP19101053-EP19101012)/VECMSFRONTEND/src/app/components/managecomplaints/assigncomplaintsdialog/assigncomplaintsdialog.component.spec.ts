import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigncomplaintsdialogComponent } from './assigncomplaintsdialog.component';

describe('AssigncomplaintsdialogComponent', () => {
  let component: AssigncomplaintsdialogComponent;
  let fixture: ComponentFixture<AssigncomplaintsdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigncomplaintsdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigncomplaintsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
