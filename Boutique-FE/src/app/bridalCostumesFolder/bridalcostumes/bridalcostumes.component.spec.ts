import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridalcostumesComponent } from './bridalcostumes.component';

describe('BridalcostumesComponent', () => {
  let component: BridalcostumesComponent;
  let fixture: ComponentFixture<BridalcostumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BridalcostumesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BridalcostumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
