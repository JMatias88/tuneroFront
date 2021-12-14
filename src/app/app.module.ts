import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarMomentDateFormatter,
  DateAdapter,
  MOMENT,
} from 'angular-calendar';
import * as moment from 'moment';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { ErrorInterceptor } from '@core/interceptor/ErrorInterceptor';
import { DemoMaterialModule } from './demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { interceptorProviders  } from '@core/interceptor'
import { ErrorHandler } from '@core/handlers/error';
import { SpinnerComponent } from './shared/spinner.component';
import { HttpRequestInterceptor } from '@core/interceptor/httpInterceptor';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}



@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoMaterialModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    ErrorHandler,
    interceptorProviders,
    ,
    {
      provide: MOMENT,
      useValue: moment,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
