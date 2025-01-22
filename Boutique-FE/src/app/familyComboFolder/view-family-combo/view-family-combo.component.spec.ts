import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFamilyComboComponent } from './view-family-combo.component';

describe('ViewFamilyComboComponent', () => {
  let component: ViewFamilyComboComponent;
  let fixture: ComponentFixture<ViewFamilyComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFamilyComboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFamilyComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
