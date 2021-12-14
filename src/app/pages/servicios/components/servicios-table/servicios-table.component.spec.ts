import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosTableComponent } from './servicios-table.component';

describe('ServiciosTableComponent', () => {
  let component: ServiciosTableComponent;
  let fixture: ComponentFixture<ServiciosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
