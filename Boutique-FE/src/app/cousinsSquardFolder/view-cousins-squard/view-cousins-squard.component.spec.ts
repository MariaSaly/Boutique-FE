import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCousinsSquardComponent } from './view-cousins-squard.component';

describe('ViewCousinsSquardComponent', () => {
  let component: ViewCousinsSquardComponent;
  let fixture: ComponentFixture<ViewCousinsSquardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCousinsSquardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCousinsSquardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
