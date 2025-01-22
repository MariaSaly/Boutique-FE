import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridesquadComponent } from './bridesquad.component';

describe('BridesquadComponent', () => {
  let component: BridesquadComponent;
  let fixture: ComponentFixture<BridesquadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BridesquadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BridesquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
