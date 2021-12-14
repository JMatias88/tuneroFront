import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { Injectable } from '@angular/core';
import { extra } from './calendar-day-view-custom.component';


@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  // you can override any of the methods defined in the parent class

  monthTooltip(event: CalendarEvent): string {
    return;
  }

  weekTooltip(event: CalendarEvent): string {
    return;
  }

  dayTooltip(event: CalendarEvent): string {
    const data: extra = event;
    if (data.extraData) {
      console.log(data.extraData)
      return `Paciente:  ${data.extraData.paciente.nombre} ${data.extraData.paciente.apellido} - Box: ${data.extraData.box} - ${data.extraData.servicio} `
    }

  }
}