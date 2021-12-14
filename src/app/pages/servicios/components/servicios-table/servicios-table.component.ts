import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Confirmable } from '@core/decorators/confirmable.decorator';
import { ErrorHandler } from '@core/handlers/error';
import { Servicios } from '@core/interfaces/Servicios';
import { ServiciosFormComponent } from 'src/app/shared/components/servicios-form/servicios-form.component';
import { DialogService } from 'src/app/shared/dialogs/services/dialog.service';
import { SwalService } from 'src/app/shared/dialogs/swal.service';
import { ServiciosService } from 'src/app/shared/services/servicios.service';

@Component({
  selector: 'app-servicios-table',
  templateUrl: './servicios-table.component.html',
  styleUrls: ['./servicios-table.component.scss']
})
export class ServiciosTableComponent implements OnInit {

  displayedColumns: string[] = ['nombre','descripcion', 'actions'];
  servicios: Servicios[];
  
  errorTable: boolean = false;

  
  dataSource = new MatTableDataSource<Servicios>();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(  
    private serviciosSrv: ServiciosService,
    private erroHandler: ErrorHandler,
    private swalSrv: SwalService,
    private dialogSrv: DialogService,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  
  async getAll() {
    try {
      this.errorTable = false;
      const response =  await this.serviciosSrv.getAll();
      this.servicios = response
      this.dataSource = new MatTableDataSource<Servicios>(this.servicios);
      this.dataSource.paginator =  this.paginator
    } catch (err) {
      this.errorTable = true
      this.erroHandler.handler(err)
    }
  }

  async clickAdd() {
    const response = await this.dialogSrv.openDialog({ createMode: true}, ServiciosFormComponent);
    if (response) {
      this.getAll()
    }
  }

 async clickEdit(row) {
   const response = await this.dialogSrv.openDialog({ createMode: false, obraSocial: row }, ServiciosFormComponent);
   if (response) {
     this.getAll()
   }
 }
  
  
   @Confirmable()
   async clickDelete(paciente:Servicios) {
     try {
       const response = await this.serviciosSrv.delete(paciente.id);
       if (response) {
         this.swalSrv.swalSuccess()
         this.getAll()
       } else {
        throw new Error("No se pudo eliminar el registro");    
       }
                 
     } catch (error) {
       console.log(error)
       this.erroHandler.handler(error)
     }
   }
}
