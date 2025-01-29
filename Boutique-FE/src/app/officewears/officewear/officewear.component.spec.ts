import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficewearComponent } from './officewear.component';

describe('OfficewearComponent', () => {
  let component: OfficewearComponent;
  let fixture: ComponentFixture<OfficewearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficewearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficewearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
