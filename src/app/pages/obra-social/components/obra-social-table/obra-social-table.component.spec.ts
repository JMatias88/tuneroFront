import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraSocialTableComponent } from './obra-social-table.component';

describe('ObraSocialTableComponent', () => {
  let component: ObraSocialTableComponent;
  let fixture: ComponentFixture<ObraSocialTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObraSocialTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraSocialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
