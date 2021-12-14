import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from '@core/interfaces/Paciente';
import { Turnos } from '@core/interfaces/Turnos';
import { lastValueFrom } from 'rxjs';
import { TurnosSingleFormComponent } from 'src/app/shared/components/turnos-single-form/turnos-single-form.component';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { TurnosService } from 'src/app/shared/services/turnos.service';
import * as _ from 'lodash'
import { Confirmable } from '@core/decorators/confirmable.decorator';
import { ErrorHandler } from '@core/handlers/error';
import { SwalService } from 'src/app/shared/dialogs/swal.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {


  dni: number;

  displayedColumns: string[] = ['fecha','horaInicio','horaFin','box','servicio','nombre','apellido','estado', 'actions'];
  turnos: Turnos[];
  
  errorTable: boolean = false;

  
  dataSource = new MatTableDataSource<Turnos>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private turnosSrv: TurnosService,
    private dialog: MatDialog,
    private errorHandler: ErrorHandler,
    private swalSrv:SwalService
  ) { }

  ngOnInit(): void {
  }



 async search() {
    try {
      if (!this.dni) {
        return
      }
      const response = await this.turnosSrv.getByPaciente(this.dni);
      console.log(response)
      this.turnos = _.orderBy(response,'fecha',['desc'])
      this.dataSource = new MatTableDataSource<Turnos>(this.turnos);
      this.dataSource.paginator =  this.paginator
      console.log(response)
    } catch (error) {
      
    }
  }


  async clickEdit(element) {
    const dialogRef = this.dialog.open(TurnosSingleFormComponent, {
      width:'250px',
      disableClose: true,
      backdropClass: 'backdrop-class',
      panelClass: 'panel-class',
      data:{createMode:false, turno:element}
    })
    const response = await lastValueFrom(dialogRef.afterClosed())
    if (response) {
      this.search()
    }
  }
  @Confirmable()
  async clickDelete(turno:Turnos) {
    try {
      const response = await this.turnosSrv.delete(turno.id);
      if (response) {
        this.swalSrv.swalSuccess()
        this.search()
      } else {
       throw new Error("No se pudo eliminar el registro");    
      }
    } catch (error) {
      this.errorHandler.handler(error)
    }
  }

}
