import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMensWearComponent } from './view-mens-wear.component';

describe('ViewMensWearComponent', () => {
  let component: ViewMensWearComponent;
  let fixture: ComponentFixture<ViewMensWearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMensWearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMensWearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
