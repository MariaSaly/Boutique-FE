import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfsareeComponent } from './halfsaree.component';

describe('HalfsareeComponent', () => {
  let component: HalfsareeComponent;
  let fixture: ComponentFixture<HalfsareeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HalfsareeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HalfsareeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
