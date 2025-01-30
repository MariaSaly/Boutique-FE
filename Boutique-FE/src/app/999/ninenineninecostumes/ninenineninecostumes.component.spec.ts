import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinenineninecostumesComponent } from './ninenineninecostumes.component';

describe('NinenineninecostumesComponent', () => {
  let component: NinenineninecostumesComponent;
  let fixture: ComponentFixture<NinenineninecostumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NinenineninecostumesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinenineninecostumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
