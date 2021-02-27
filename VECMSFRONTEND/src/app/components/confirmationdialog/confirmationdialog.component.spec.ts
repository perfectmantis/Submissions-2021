import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationdialogComponent } from './confirmationdialog.component';

describe('ConfirmationdialogComponent', () => {
  let component: ConfirmationdialogComponent;
  let fixture: ComponentFixture<ConfirmationdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
