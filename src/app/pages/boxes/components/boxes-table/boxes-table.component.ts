import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Confirmable } from '@core/decorators/confirmable.decorator';
import { ErrorHandler } from '@core/handlers/error';
import { Boxes } from '@core/interfaces/Boxes';
import { BoxesFormComponent } from 'src/app/shared/components/boxes-form/boxes-form.component';
import { DialogService } from 'src/app/shared/dialogs/services/dialog.service';
import { SwalService } from 'src/app/shared/dialogs/swal.service';
import { BoxesService } from 'src/app/shared/services/boxes.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-boxes-table',
  templateUrl: './boxes-table.component.html',
  styleUrls: ['./boxes-table.component.scss']
})
export class BoxesTableComponent implements OnInit {


  displayedColumns: string[] = [ 'nombre','descripcion', 'actions'];
  boxes: Boxes[];
  errorTable: boolean = false;
  
  dataSource = new MatTableDataSource<Boxes>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private boxesSrv: BoxesService,
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
      this.errorTable = false
      const response = await this.boxesSrv.getAll();
      this.boxes = response
      this.dataSource = new MatTableDataSource<Boxes>(this.boxes);
      this.dataSource.paginator =  this.paginator
    } catch (err) {
      this.errorTable = true
      this.erroHandler.handler(err)
    }
  }

 async clickAdd() {
    const response = await this.dialogSrv.openDialog({ createMode: true}, BoxesFormComponent);
    if (response) {
      this.getAll()
    }
  }

 async clickEdit(row) {
   const response = await this.dialogSrv.openDialog({ createMode: false, obraSocial: row }, BoxesFormComponent);
   if (response) {
     this.getAll()
   }
 }
  
  
   @Confirmable()
   async clickDelete(paciente:Boxes) {
     try {
       const response = await this.boxesSrv.delete(paciente.id);
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
