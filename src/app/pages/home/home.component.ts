import {  Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';

import { CalendarDayViewCustomComponent } from 'src/app/shared/components/calendar-day-view-custom/calendar-day-view-custom.component';
import { TurnosFormComponent } from 'src/app/shared/components/turnos-form/turnos-form.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 

  @ViewChild(CalendarDayViewCustomComponent) child:CalendarDayViewCustomComponent

  selected: Date | null = new Date();

  constructor(
    private _adapter: DateAdapter<any>,
    private dialog: MatDialog,
  ) {
    this._adapter.setLocale('es');
   }

  ngOnInit(): void {
    
  }


  dateChange(date: Date) {
    console.log(date)
    this.selected = date
    this.child.getTurnos(date)
  }


async clickAgendarTurno() {
    const dialogRef = this.dialog.open(TurnosFormComponent, {
      width:'250px',
      disableClose: true,
      backdropClass: 'backdrop-class',
      panelClass: 'panel-class',
      data:{createMode:true}
    })
    const response = await lastValueFrom(dialogRef.afterClosed())
    if (response) {
      this.child.getTurnos(this.selected);
    }
  }

 


}
