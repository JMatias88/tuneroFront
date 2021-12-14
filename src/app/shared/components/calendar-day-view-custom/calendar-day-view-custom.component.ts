import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Confirmable } from '@core/decorators/confirmable.decorator';
import { ErrorHandler } from '@core/handlers/error';
import { Turnos } from '@core/interfaces/Turnos';
import { turnos } from '@core/mock/turnos';
import { CalendarView, CalendarEventAction, CalendarEvent, CalendarEventTimesChangedEvent, DAYS_OF_WEEK, CalendarDateFormatter, CalendarEventTitleFormatter, CalendarNativeDateFormatter, DateFormatterParams } from 'angular-calendar';
import * as moment from 'moment';
import { Subject, lastValueFrom } from 'rxjs';


import Swal from 'sweetalert2';
import { SwalService } from '../../dialogs/swal.service';
import { TurnosService } from '../../services/turnos.service';
import { TurnosFormComponent } from '../turnos-form/turnos-form.component';
import { CustomEventTitleFormatter } from './custom-event.provider';


export interface extra extends CalendarEvent {
  extraData?: Turnos
}


// weekStartsOn option is ignored when using moment, as it needs to be configured globally for the moment locale
moment.updateLocale('es', {
  week: {
    dow: DAYS_OF_WEEK.MONDAY,
    doy: 0,
  },
});

const colors: any = {
  PROGRAMADO: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  VINO: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  FINALIZADO: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


class CustomDateFormatter extends CalendarNativeDateFormatter {

  public dayViewHour({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat('ca', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }

}

@Component({
  selector: 'app-calendar-day-view-custom',
  templateUrl: './calendar-day-view-custom.component.html',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    },
  {
    provide: CalendarDateFormatter, 
    useClass: CustomDateFormatter
  }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar-day-view-custom.component.scss']
})
export class CalendarDayViewCustomComponent implements OnInit {

  @Input() date:Date = new Date()

  view: CalendarView = CalendarView.Day;

  viewDate: Date = new Date();

  starterHour = new Date().getHours();
  lastHour = new Date().setHours(18,0,0,0)

  turnos: Turnos[] = turnos
 



  refresh: Subject<any> = new Subject();

  actions: CalendarEventAction[] = [
    // {
    //   label: '<i class="fas fa-fw fa-pencil-alt"></i>',
    //   a11yLabel: 'Edit',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.editTurno(event);
    //   },
    // },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deletedTurno(event)
        // this.events = this.events.filter((iEvent) => iEvent !== event);
        // this.handleEvent('Deleted', event);
      },
    },
  ];


  events: extra[] = []

  constructor(
    private turnosSrv: TurnosService,
    private dialog: MatDialog,
    private errorHandler: ErrorHandler,
    private swalSrv:SwalService
  ) { }

  ngOnInit(): void {
    this.getTurnos(this.date);
  }

  async getTurnos(date) {
    this.date = date;
    this.viewDate = date;
    let d = moment(this.date).format();
    console.log(this.date)
    const response = await this.turnosSrv.getByDate(d);
    this.turnos = response;
    this.addEvent();    
  }

  addEvent(): void {
    try {
      this.events = []
      this.turnos.forEach((turno) => {
        const [hora, minutos] = turno.horaInicio.split(':');
        const [horafin, minutosfin] = turno.horaFin.split(':')
        let date = new Date(moment(turno.fecha).format());
        let start = new Date(date.setHours(Number(hora),Number(minutos),0));
        let end = new Date(date.setHours(Number(horafin), Number(minutosfin),0));
        this.events = [
          ...this.events,
          {
            title: `${turno.paciente.nombre} ${turno.paciente.apellido}`,
            start:start,
            end:end,
            color:  colors[turno.estado],
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            actions:this.actions,
            extraData: turno
          },
        ];
      })

      console.log(this.events)
      this.refresh.next(null)
    } catch (error) {
      console.error(error)
    }

  }


  @Confirmable({text:"¿Esta seguro de eliminar el turno agendado?"})
  async deletedTurno(event: extra){
    const { extraData } = event;
    try {
      const response = await this.turnosSrv.delete(extraData.id);
      if (response) { this.swalSrv.swalSuccess('Turno eliminado correctamente'); this.getTurnos(this.date)}
      else { throw new Error("No se pudo completar la operacion");
       }
    } catch (error) {
      this.errorHandler.handler(error)
    }
  }

  async editTurno(event) {
    let { date, extraData } = event
    console.log(date)
    const dialogRef = this.dialog.open(TurnosFormComponent, {
      width:'250px',
      disableClose: true,
      backdropClass: 'backdrop-class',
      panelClass: 'panel-class',
      data:{date:date, createMode:false, turno: extraData}
    })
    const response = await lastValueFrom(dialogRef.afterClosed())
    if (response) {
      this.getTurnos(this.date);
    }
  }

  // async handleEvent(action: string, event) {

  // }
  dayTooltip(event: CalendarEvent): string {
    return;
  }

  @Confirmable({text:"¿Confirma el cambio de Horario?",title:"Confirmacion de cambio"})
 async  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): Promise<void> {
    try {
      let newEvent: extra = event
      let turno = newEvent.extraData
      newEvent.start = newStart;
      newEvent.end = newEnd;
      let horaInicio = newStart.getHours() + ':' + (newStart.getMinutes() < 10 ? "0" + newStart.getMinutes() : newStart.getMinutes());
      let horaFin = newEnd.getHours() + ':' + (newEnd.getMinutes() < 10 ? "0" + newEnd.getMinutes() : newEnd.getMinutes());
      turno.horaFin = horaFin;
      turno.horaInicio = horaInicio;
      let response = await this.turnosSrv.update(turno.id,turno)
      if (response) {
        Swal.fire({
          title: "Modificado",
          text: "Turno Modificado correctamente",
          icon: "success"
        })
      }
      this.refresh.next(null);
    } catch (error) {
      console.error(error)
    }

  }

  async hourSegmentClicked(event) {
    console.log(event)
    let { date } = event
    const dialogRef = this.dialog.open(TurnosFormComponent, {
      width:'250px',
      disableClose: true,
      backdropClass: 'backdrop-class',
      panelClass: 'panel-class',
      data:{date:date, createMode:true}
    })
    const response = await lastValueFrom(dialogRef.afterClosed())
    if (response) {
      this.getTurnos(this.date);
    }
  }

}
