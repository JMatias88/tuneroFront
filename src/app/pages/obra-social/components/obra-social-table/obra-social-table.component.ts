import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Confirmable } from '@core/decorators/confirmable.decorator';
import { ObraSocial } from '@core/interfaces/ObraSocial';
import { DialogService } from 'src/app/shared/dialogs/services/dialog.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ObraSocialService } from 'src/app/shared/services/obra-social.service';
import Swal from 'sweetalert2';
import { ObraSocialFormComponent } from '../obra-social-form/obra-social-form.component';
import { ErrorHandler } from '@core/handlers/error';
import { SwalService } from 'src/app/shared/dialogs/swal.service';

@Component({
  selector: 'app-obra-social-table',
  templateUrl: './obra-social-table.component.html',
  styleUrls: ['./obra-social-table.component.scss']
})
export class ObraSocialTableComponent implements OnInit {

  displayedColumns: string[] = [ 'nombre','coseguro', 'actions'];
  obraSociales: ObraSocial[];

  
  dataSource = new MatTableDataSource<ObraSocial>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private obraSocialSrv: ObraSocialService,
    private dialogSrv: DialogService,
    private notificationSrv: NotificationService,
    private erroHandler: ErrorHandler,
    private swalSrv:SwalService
  ) { }

  ngOnInit(): void {
    this.getAll()
  }


  async getAll() {
    try {    
      const response = await this.obraSocialSrv.getAll();
      this.obraSociales = response
      this.dataSource = new MatTableDataSource<ObraSocial>(this.obraSociales);
      this.dataSource.paginator =  this.paginator
    } catch (err) {
      this.erroHandler.handler(err)
    }
  }

 async clickAdd() {
    const response = await this.dialogSrv.openDialog({ createMode: true}, ObraSocialFormComponent);
    if (response) {
      this.getAll()
    }
  }

 async clickEdit(row) {
   const response = await this.dialogSrv.openDialog({ createMode: false, obraSocial: row }, ObraSocialFormComponent);
   if (response) {
     this.getAll()
   }
 }
  
  
   @Confirmable()
   async clickDelete(paciente:ObraSocial) {
     try {
       const response = await this.obraSocialSrv.delete(paciente.id);
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
