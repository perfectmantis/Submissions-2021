import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpopupComponent } from './userpopup.component';

describe('UserpopupComponent', () => {
  let component: UserpopupComponent;
  let fixture: ComponentFixture<UserpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
