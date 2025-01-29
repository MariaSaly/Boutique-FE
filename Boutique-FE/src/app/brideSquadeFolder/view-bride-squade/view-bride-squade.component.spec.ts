import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBrideSquadeComponent } from './view-bride-squade.component';

describe('ViewBrideSquadeComponent', () => {
  let component: ViewBrideSquadeComponent;
  let fixture: ComponentFixture<ViewBrideSquadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBrideSquadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBrideSquadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
