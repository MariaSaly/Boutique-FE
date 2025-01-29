import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcoordsComponent } from './viewcoords.component';

describe('ViewcoordsComponent', () => {
  let component: ViewcoordsComponent;
  let fixture: ComponentFixture<ViewcoordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewcoordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcoordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
