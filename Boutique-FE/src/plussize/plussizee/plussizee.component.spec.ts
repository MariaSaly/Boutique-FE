import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlussizeeComponent } from './plussizee.component';

describe('PlussizeeComponent', () => {
  let component: PlussizeeComponent;
  let fixture: ComponentFixture<PlussizeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlussizeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlussizeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
