import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeggingComponent } from './legging.component';

describe('LeggingComponent', () => {
  let component: LeggingComponent;
  let fixture: ComponentFixture<LeggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeggingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
