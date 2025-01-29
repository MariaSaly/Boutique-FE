import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CousinsSquardComponent } from './cousins-squard.component';

describe('CousinsSquardComponent', () => {
  let component: CousinsSquardComponent;
  let fixture: ComponentFixture<CousinsSquardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CousinsSquardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CousinsSquardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
