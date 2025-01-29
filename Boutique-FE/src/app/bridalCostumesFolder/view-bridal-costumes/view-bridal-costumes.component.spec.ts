import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBridalCostumesComponent } from './view-bridal-costumes.component';

describe('ViewBridalCostumesComponent', () => {
  let component: ViewBridalCostumesComponent;
  let fixture: ComponentFixture<ViewBridalCostumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBridalCostumesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBridalCostumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
