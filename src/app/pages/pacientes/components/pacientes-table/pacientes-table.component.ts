import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Confirmable } from '@core/decorators/confirmable.decorator';
import { ErrorHandler } from '@core/handlers/error';
import { ObraSocial } from '@core/interfaces/ObraSocial';
import { Paciente } from '@core/interfaces/Paciente';
import { ResponsePaginate } from '@core/interfaces/ResponsePaginate';
import { User } from '@core/interfaces/User';
import { lastValueFrom } from 'rxjs';
import { SwalService } from 'src/app/shared/dialogs/swal.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ObraSocialService } from 'src/app/shared/services/obra-social.service';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import Swal from 'sweetalert2';
import { PacientesFormComponent } from '../pacientes-form/pacientes-form.component';

import * as _ from 'lodash'

@Component({
  selector: 'app-pacientes-table',
  templateUrl: './pacientes-table.component.html',
  styleUrls: ['./pacientes-table.component.scss']
})
export class PacientesTableComponent implements OnInit {

  displayedColumns: string[] = [ 'dni','nombre','apellido','direccion','telefono', 'obraSocial', 'actions'];
  pacientes: Paciente[];

  
  dataSource = new MatTableDataSource<Paciente>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  obraSociales: ObraSocial[];
  


  filter: FormGroup;
  initialValues :FormGroup
  filters:any

  paginateData:ResponsePaginate

  currentPage: number = 1;
  limitPage: number = 10;

  debounce = _.debounce(() => this.filterData(), 1000);


  constructor(
    private pacientesSrv: PacienteService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private obraSocialSrv: ObraSocialService,
    private errorHandler: ErrorHandler,
    private swalSrv: SwalService,
    // private loadingSrv:LoadingService
  ) {
    this.getAllObraSociales()
   }

  ngOnInit(): void {
    this.filter = this.formBuilder.group({
      dni: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl(''),
      obraSocialId:new FormControl('')
    })
    this.initialValues = this.filter.value;

    // this.filter.valueChanges.subscribe(res => this.filterData(res))
    this.filter.valueChanges.subscribe(res => {
      this.filters = res
      this.debounce()
    }
    )
    this.getAll()
  }



  async getAllObraSociales() {
    try {
      const response = await this.obraSocialSrv.getAll();
      this.obraSociales = response
    } catch (error) {
      console.log(error)
      this.errorHandler.handler(error)
    }
  }


  async getAll() {
    try {
      const response = await this.pacientesSrv.paginate({ skip: this.currentPage, take: this.limitPage, filters: this.filters });
      this.paginateData = response;
      this.pacientes = response.data;
      this.paginator.length = this.paginateData.total;
  
      this.dataSource = new MatTableDataSource<Paciente>(this.pacientes)   
    } catch (error) {
      this.errorHandler.handler(error)
    }
  }

  pageEvent(event) {
    this.currentPage = event.pageIndex + 1;
    this.limitPage = event.pageSize;
    this.getAll()
  }

  filterData() {
    // this.filters = data;
    this.currentPage = 1;
    this.paginator.pageIndex = 0;
    this.getAll()
  }

  public async clickAdd() {
    let data = { createMode: true, userList: this.pacientes };
    this.openDialog(data)
  }

  clickEdit(paciente:Paciente) {
    let data = { createMode: false, userList: this.pacientes, paciente };
    this.openDialog(data)
  }

  async openDialog(data) {
    const dialogRef = this.dialog.open(PacientesFormComponent, {
      width:'250px',
      disableClose: true,
      backdropClass: 'backdrop-class',
      panelClass: 'panel-class',
      data
    })
   const response = await lastValueFrom(dialogRef.afterClosed())
   if (response) {
     this.getAll()
   }
  }

  @Confirmable()
  async clickDelete(paciente:Paciente) {
    try {
      const response = await this.pacientesSrv.delete(paciente.id);
      if (response) {
        this.swalSrv.swalSuccess()
        this.getAll()
      } else {
       throw new Error("No se pudo eliminar el registro");    
      }
    } catch (error) {
      this.errorHandler.handler(error)
    }
  }

}
