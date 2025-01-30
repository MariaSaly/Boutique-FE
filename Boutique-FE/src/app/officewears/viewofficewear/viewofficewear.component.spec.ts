import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewofficewearComponent } from './viewofficewear.component';

describe('ViewofficewearComponent', () => {
  let component: ViewofficewearComponent;
  let fixture: ComponentFixture<ViewofficewearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewofficewearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewofficewearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
