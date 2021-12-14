import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorHandler } from '@core/handlers/error';
import { Servicios } from '@core/interfaces/Servicios';
import { SwalService } from '../../dialogs/swal.service';
import { BoxesService } from '../../services/boxes.service';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-servicios-form',
  templateUrl: './servicios-form.component.html',
  styleUrls: ['./servicios-form.component.scss']
})
export class ServiciosFormComponent implements OnInit {

  createMode: boolean = false;
  servicio: Servicios;
  servicioForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicioSrv: ServiciosService,
    private dialogRef: MatDialogRef<ServiciosFormComponent>,
    private errorHandler: ErrorHandler,
    private swalSrv:SwalService
  ) {
    const { createMode, obraSocial } = data;
    this.createMode = createMode;
    if (obraSocial) this.servicio = obraSocial

    this.servicioForm = this.formBuilder.group({
      id: new FormControl(null),
      nombre: new FormControl('',[Validators.required]),
      descripcion: new FormControl('')
    })
    if (!this.createMode) {
      this.servicioForm.patchValue(this.servicio)
    }
 
  }

  ngOnInit(): void {
  }


  async submit() {
    let servicio: Servicios = this.servicioForm.value;
    servicio.nombre = servicio.nombre.toUpperCase();
    try {            
      const response = (this.createMode ? await this.servicioSrv.create(servicio) :
                                          await this.servicioSrv.update(servicio.id,servicio));
      if (response) {
        this.swalSrv.swalSuccess()
        this.onClose(true)
      } else {
        throw new Error("No se pudo completar la operacion");        
      }
    } catch (err) {
      this.onClose(false)
      this.errorHandler.handler(err)
    }
  }


  onClose(state) {
    this.dialogRef.close(state)
  }

}
