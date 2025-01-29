import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMomandDaughterComponent } from './view-momand-daughter.component';

describe('ViewMomandDaughterComponent', () => {
  let component: ViewMomandDaughterComponent;
  let fixture: ComponentFixture<ViewMomandDaughterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMomandDaughterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMomandDaughterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
