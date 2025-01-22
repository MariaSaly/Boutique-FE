import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomandDaughterComponent } from './momand-daughter.component';

describe('MomandDaughterComponent', () => {
  let component: MomandDaughterComponent;
  let fixture: ComponentFixture<MomandDaughterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MomandDaughterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MomandDaughterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
