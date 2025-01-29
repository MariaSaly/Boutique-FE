import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyComboComponent } from './family-combo.component';

describe('FamilyComboComponent', () => {
  let component: FamilyComboComponent;
  let fixture: ComponentFixture<FamilyComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyComboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
