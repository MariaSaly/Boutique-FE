import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnandexchangeComponent } from './returnandexchange.component';

describe('ReturnandexchangeComponent', () => {
  let component: ReturnandexchangeComponent;
  let fixture: ComponentFixture<ReturnandexchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnandexchangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnandexchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
