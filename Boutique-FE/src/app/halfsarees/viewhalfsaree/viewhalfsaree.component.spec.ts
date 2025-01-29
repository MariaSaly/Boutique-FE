import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewhalfsareeComponent } from './viewhalfsaree.component';

describe('ViewhalfsareeComponent', () => {
  let component: ViewhalfsareeComponent;
  let fixture: ComponentFixture<ViewhalfsareeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewhalfsareeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewhalfsareeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
