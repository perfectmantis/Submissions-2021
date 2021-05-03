import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistercomplaintComponent } from './registercomplaint.component';

describe('RegistercomplaintComponent', () => {
  let component: RegistercomplaintComponent;
  let fixture: ComponentFixture<RegistercomplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistercomplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistercomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
