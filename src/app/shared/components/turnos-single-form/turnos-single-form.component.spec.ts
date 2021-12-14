import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosSingleFormComponent } from './turnos-single-form.component';

describe('TurnosSingleFormComponent', () => {
  let component: TurnosSingleFormComponent;
  let fixture: ComponentFixture<TurnosSingleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosSingleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosSingleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
