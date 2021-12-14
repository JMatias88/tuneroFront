import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorHandler } from '@core/handlers/error';
import { Estados, Turnos } from '@core/interfaces/Turnos';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment'
import { Boxes } from '@core/interfaces/Boxes';
import { BoxesService } from '../../services/boxes.service';
import { ServiciosService } from '../../services/servicios.service';
import { Servicios } from '@core/interfaces/Servicios';
import { TurnosService } from '../../services/turnos.service';
import { SwalService } from '../../dialogs/swal.service';
import { LoadingService } from '../../services/loading.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-turnos-single-form',
  templateUrl: './turnos-single-form.component.html',
  styleUrls: ['./turnos-single-form.component.scss']
})
export class TurnosSingleFormComponent implements OnInit {

  turnosForm: FormGroup;
  turno: Turnos
  
  

  createMode: boolean = false
  
  boxes: Boxes[];
  servicios: Servicios[];
  estados = Estados;
  estadoKeys = Object.keys(Estados)

  constructor(
    private turnosSrv:TurnosService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TurnosSingleFormComponent>,
    private boxSrv:BoxesService,
    private errorHandler: ErrorHandler,
    private servicioSrv: ServiciosService,
    private swalService:SwalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adapter: DateAdapter<any>,
    private loadingSrv:LoadingService
  ) {
    this._adapter.setLocale('es');
    const { createMode, turno } = data;
    this.createMode = createMode;
    this.turno = turno
    console.log(this.turno)
   }

  ngOnInit(): void {
    this.getAllBoxes()
    this.getAllServicios()
    this.turnosForm = this.formBuilder.group({
      id: null,
      fecha: new FormControl(moment()),
      horaInicio: new FormControl(''),
      horaFin: new FormControl(''),
      box: new FormControl(''),
      servicio: new FormControl(''),
      estado: new FormControl(''),
      paciente: new FormControl(''),
    })
    if (!this.createMode) {
      this.turnosForm.patchValue(this.turno)
    }

  }


  async getAllBoxes() {
    try {
      const response = await this.boxSrv.getAll();
      this.boxes  = response
    } catch (error) {
      this.errorHandler.handler(error)
    }
  }

  
  async getAllServicios() {
    try {
      const response = await this.servicioSrv.getAll();
      this.servicios  = response
    } catch (error) {
      this.errorHandler.handler(error)
    }
  }


  async submit() {
    
    const turnoSave:Turnos = this.turnosForm.value
    try {
      const response = await this.turnosSrv.update(turnoSave.id, turnoSave);
      this.onClose(true)
      if (response) {
        this.swalService.swalSuccess()
      } else {
        throw new Error("No se pudo completar la operacion");        
      }
    } catch (error) {
      this.onClose(false)
      this.errorHandler.handler(error)
    }
  }


  onClose(state: boolean) {
    this.dialogRef.close(state)
  }

}
