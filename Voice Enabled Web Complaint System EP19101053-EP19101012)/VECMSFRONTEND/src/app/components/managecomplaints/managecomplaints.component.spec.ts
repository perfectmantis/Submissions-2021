import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecomplaintsComponent } from './managecomplaints.component';

describe('ManagecomplaintsComponent', () => {
  let component: ManagecomplaintsComponent;
  let fixture: ComponentFixture<ManagecomplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagecomplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecomplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
