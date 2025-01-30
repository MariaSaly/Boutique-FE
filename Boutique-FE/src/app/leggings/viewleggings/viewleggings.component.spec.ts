import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewleggingsComponent } from './viewleggings.component';

describe('ViewleggingsComponent', () => {
  let component: ViewleggingsComponent;
  let fixture: ComponentFixture<ViewleggingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewleggingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewleggingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
