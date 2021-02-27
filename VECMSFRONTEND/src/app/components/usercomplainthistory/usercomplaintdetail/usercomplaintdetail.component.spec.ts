import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercomplaintdetailComponent } from './usercomplaintdetail.component';

describe('UsercomplaintdetailComponent', () => {
  let component: UsercomplaintdetailComponent;
  let fixture: ComponentFixture<UsercomplaintdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercomplaintdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercomplaintdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
