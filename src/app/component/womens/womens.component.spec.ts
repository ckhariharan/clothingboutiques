import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensComponent } from './womens.component';

describe('WomensComponent', () => {
  let component: WomensComponent;
  let fixture: ComponentFixture<WomensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WomensComponent]
    });
    fixture = TestBed.createComponent(WomensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
