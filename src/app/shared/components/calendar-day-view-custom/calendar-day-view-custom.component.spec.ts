import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayViewCustomComponent } from './calendar-day-view-custom.component';

describe('CalendarDayViewCustomComponent', () => {
  let component: CalendarDayViewCustomComponent;
  let fixture: ComponentFixture<CalendarDayViewCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDayViewCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayViewCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
