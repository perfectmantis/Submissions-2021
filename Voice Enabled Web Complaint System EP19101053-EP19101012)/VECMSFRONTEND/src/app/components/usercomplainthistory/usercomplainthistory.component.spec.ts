import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercomplainthistoryComponent } from './usercomplainthistory.component';

describe('UsercomplainthistoryComponent', () => {
  let component: UsercomplainthistoryComponent;
  let fixture: ComponentFixture<UsercomplainthistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercomplainthistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercomplainthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
