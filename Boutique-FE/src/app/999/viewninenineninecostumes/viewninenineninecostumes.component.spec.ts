import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewninenineninecostumesComponent } from './viewninenineninecostumes.component';

describe('ViewninenineninecostumesComponent', () => {
  let component: ViewninenineninecostumesComponent;
  let fixture: ComponentFixture<ViewninenineninecostumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewninenineninecostumesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewninenineninecostumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
