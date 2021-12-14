import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorHandler } from '@core/handlers/error';
import { ObraSocial } from '@core/interfaces/ObraSocial';
import { Paciente } from '@core/interfaces/Paciente';
import { SwalService } from 'src/app/shared/dialogs/swal.service';
import { ObraSocialService } from 'src/app/shared/services/obra-social.service';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import Swal from 'sweetalert2';


export interface DialogData {
  createMode: boolean,
  pacienteList: Paciente[];
  paciente?:Paciente
}


@Component({
  selector: 'app-pacientes-form',
  templateUrl: './pacientes-form.component.html',
  styleUrls: ['./pacientes-form.component.scss']
})
export class PacientesFormComponent implements OnInit {

  createMode: boolean;
  pacienteList: Paciente[] = [];
  obraSociales:ObraSocial[]

  roles:string[]
  paciente:Paciente
  pacienteForm: FormGroup;

  pacienteObraSocialForm:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PacientesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private pacienteSrv: PacienteService,
    private obraSocialSrv: ObraSocialService,
    private swalSrv: SwalService,
    private errorHandler:ErrorHandler
  ) {
    this.pacienteList = data.pacienteList;
    this.createMode = data.createMode;
    this.getAllObraSociales();
    this.pacienteForm = this.formBuilder.group({
      id:null,
      dni: new FormControl('',[Validators.required]),
      nombre: new FormControl('',[Validators.required]),
      apellido: new FormControl('',[Validators.required]),
      direccion: new FormControl('',[Validators.required]),
      telefono: new FormControl('', Validators.required),
      socialNumber: new FormControl(''),
      fechaNacimiento:new FormControl('', [Validators.required]),
      obraSocial:new FormControl('')
    })
    if (!data.createMode) {
      console.log(this.paciente)
      this.paciente = data.paciente;
      this.pacienteForm.patchValue(this.paciente)
      console.log(this.pacienteForm.value)
    }
   }

  ngOnInit(): void {

    
  }


  async getAllObraSociales() {
    try {
      const response = await this.obraSocialSrv.getAll();
      this.obraSociales = response
    } catch (error) {
      this.errorHandler.handler(error);
      
    }
  }


  async submit() {
    console.log('Submited')
    console.log(this.pacienteForm.value)
    let newPaciente: Paciente = this.pacienteForm.value;
    try {
      const response = (this.createMode ? await this.pacienteSrv.create(newPaciente ): await this.pacienteSrv.update(this.paciente.id, newPaciente) )
      if (response) {
        this.swalSrv.swalSuccess();
        this.onClose(true);
      } else {
        throw new Error("No se pudo completar la operacion");  
      }            
    } catch (error) {
      this.errorHandler.handler(error)
      this.onClose(false);
    }

 }
  
  onClose(state: boolean) {
    this.dialogRef.close(state)
  }

  compareWith(o1: any, o2: any): boolean { 
    return ( o1.id == o2.id)
  }
}
