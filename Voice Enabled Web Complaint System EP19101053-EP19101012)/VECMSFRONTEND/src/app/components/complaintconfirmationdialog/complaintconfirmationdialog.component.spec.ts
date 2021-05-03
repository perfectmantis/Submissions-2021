import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintconfirmationdialogComponent } from './complaintconfirmationdialog.component';

describe('ComplaintconfirmationdialogComponent', () => {
  let component: ComplaintconfirmationdialogComponent;
  let fixture: ComponentFixture<ComplaintconfirmationdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintconfirmationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintconfirmationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
