import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAddresssModelComponent } from './delivery-addresss-model.component';

describe('DeliveryAddresssModelComponent', () => {
  let component: DeliveryAddresssModelComponent;
  let fixture: ComponentFixture<DeliveryAddresssModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryAddresssModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryAddresssModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
