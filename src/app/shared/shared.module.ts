import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TurnosFormComponent } from './components/turnos-form/turnos-form.component';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CalendarDayViewCustomComponent } from './components/calendar-day-view-custom/calendar-day-view-custom.component'
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { momentAdapterFactory } from '../app.module';
import { ErrorToastrComponent,SuccessToastComponent,InfoToastrComponent } from './components/notification'
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from '@core/interceptor/ErrorInterceptor';
import { BoxesFormComponent } from './components/boxes-form/boxes-form.component';
import { ServiciosFormComponent } from './components/servicios-form/servicios-form.component';
import { TurnosSingleFormComponent } from './components/turnos-single-form/turnos-single-form.component';

@NgModule({
  declarations: [  
    TurnosFormComponent,
    CalendarDayViewCustomComponent,
    ErrorToastrComponent,
    SuccessToastComponent,
    InfoToastrComponent,
    BoxesFormComponent,
    ServiciosFormComponent,
    TurnosSingleFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DemoMaterialModule,
    NgxMaterialTimepickerModule,    
    CalendarModule.forRoot(      
      {
        
        provide: DateAdapter,
        useFactory: momentAdapterFactory,
      }      
    ),
  ],
  exports: [
    CalendarDayViewCustomComponent
  ]
})
export class SharedModule { }
