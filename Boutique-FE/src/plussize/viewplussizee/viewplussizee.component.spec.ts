import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewplussizeeComponent } from './viewplussizee.component';

describe('ViewplussizeeComponent', () => {
  let component: ViewplussizeeComponent;
  let fixture: ComponentFixture<ViewplussizeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewplussizeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewplussizeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
