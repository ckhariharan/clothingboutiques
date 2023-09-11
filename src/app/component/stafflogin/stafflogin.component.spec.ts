import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffloginComponent } from './stafflogin.component';

describe('StaffloginComponent', () => {
  let component: StaffloginComponent;
  let fixture: ComponentFixture<StaffloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffloginComponent]
    });
    fixture = TestBed.createComponent(StaffloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
