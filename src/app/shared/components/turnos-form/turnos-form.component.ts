import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Paciente } from '@core/interfaces/Paciente';
import { map, Observable, startWith } from 'rxjs';
import { PacienteService } from '../../services/paciente.service';

import * as moment from 'moment'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Estados, Turnos } from '@core/interfaces/Turnos';
import { TurnosService } from '../../services/turnos.service';
import { ServiciosService } from '../../services/servicios.service';
import { ErrorHandler } from '@core/handlers/error';
import { Servicios } from '@core/interfaces/Servicios';
import { Boxes } from '@core/interfaces/Boxes';
import { BoxesService } from '../../services/boxes.service';

export  interface defaultConfigTurnos {
  excludeSabado: boolean,
  excludeDomingo: boolean,
  duracionDefault: number,
  
}

@Component({
  selector: 'app-turnos-form',
  templateUrl: './turnos-form.component.html',
  styleUrls: ['./turnos-form.component.scss']
})
export class TurnosFormComponent implements OnInit {

  createMode:boolean = false

  configuraciones:defaultConfigTurnos = {
    excludeDomingo: true,
    excludeSabado: true,
    duracionDefault:30
  }

  range = new FormGroup({
    start: new FormControl('',[Validators.required]),
    end: new FormControl()
  })

  rangeTime = new FormGroup({
    start: new FormControl('',[Validators.required]),
    end : new FormControl('',[Validators.required])
  })

  myTimePicker: Date = new Date(new Date().setHours(8, 0))

  sesiones:number = 1
  
  myControl = new FormControl();
  timeForm = new FormControl();
  pacientes: Paciente[];
  filteredOptions: Observable<Paciente[]>;

  horaInicio:string
  horaFin: string
  
  pacienteSelected: Paciente
  
  fechaSesiones: string[]
  
  servicios: Servicios[];
  servicioSelected: Servicios;
  boxes: Boxes[];
  boxSelected : Boxes

  estados = Estados;
  estadoSelected = "PROGRAMADO";
  estadoKeys = Object.keys(Estados)

  


  turno:Turnos



  constructor(
    private turnosSrv:TurnosService,
    private pacienteSrv: PacienteService,
    private servicioSrv: ServiciosService,
    private boxSrv:BoxesService,
    private dialogRef: MatDialogRef<TurnosFormComponent>,
    private errorHandler:ErrorHandler,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    const { date, turno, createMode } = data;
    this.createMode = createMode
    if (!this.createMode) {
      this.turno = turno
      this.range.get("start").setValue(this.turno.fecha);
      this.range.get("end").setValue(this.turno.fecha);
      this.generateTurnos(new Date(this.range.get("start").value),new Date(this.range.get("end").value))
      this.horaInicio = this.turno.horaInicio;
      this.horaFin = this.turno.horaFin;
      this.rangeTime.get('start').setValue(this.horaInicio);
      this.rangeTime.get('end').setValue(this.horaFin);
      this.pacienteSelected = this.turno.paciente
      this.myControl.setValue(this.turno.paciente)
    } else {
      if (date) {
        console.log(date)
        let d = new Date(date)
        this.range.get("start").setValue(date);
        this.range.get("end").setValue(date);
        this.generateTurnos( this.range.get("start").value, this.range.get("end").value)
        this.horaInicio = d.getHours() + ':' + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
        let fin = moment(d).add(this.configuraciones.duracionDefault, 'minute').format();
        this.horaFin = new Date(fin).getHours() + ':' + (new Date(fin).getMinutes() < 10 ? "0" + new Date(fin).getMinutes() : new Date(fin).getMinutes())
        this.rangeTime.get('start').setValue(this.horaInicio)
        this.rangeTime.get('end').setValue(this.horaFin)
      }
    }

  }

  ngOnInit(): void {

    this.getALL();
    this.getAllServicios();
    this.getAllBoxes();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );


    this.range.valueChanges.subscribe((res: any) => {      
      const { start, end } = res
        this.generateTurnos(start, end);

    } )

  }

  change(event) {
    console.log(event)
  }

  async getALL() {
    try {
      const response = await this.pacienteSrv.getAll();
      this.pacientes = response
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

  async getAllBoxes() {
    try {
      const response = await this.boxSrv.getAll();
      this.boxes  = response
    } catch (error) {
      this.errorHandler.handler(error)
    }
  }


  generateTurnos(start: Date, end: Date) {
    let currentDate = moment(start.setHours(0,0));
    let sesiones = 0;
    let fechas = []
    if (end) {
      while (!currentDate.isAfter(moment(end))) {
        let day = new Date(currentDate.format()).getDay();        
        if ((day !== 0 || !this.configuraciones.excludeDomingo) && (day !== 6 || !this.configuraciones.excludeSabado)) {
          console.log('fecha Agregada')
          fechas.push(currentDate.format());
          sesiones++
        }
        currentDate = currentDate.add(1, 'day');
      }
    } else {
      fechas.push(currentDate.format())
    }    
    console.log(fechas)
    this.sesiones = fechas.length
    this.fechaSesiones = fechas;
  }

  private _filter(value: string): Paciente[] {
    const filterValue = value;
    if (this.pacientes) {
      return this.pacientes.filter(option => option.dni.toString().includes(filterValue));  
    }    
  }

  displayFn(paciente: Paciente): string {
    return paciente  ? `${paciente.nombre} ${paciente.apellido}` : '';
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  selectedPaciente(data) {
    this.pacienteSelected = data
  }

  async submit() {
    try {
      let turnos: Turnos[] = [];
      this.fechaSesiones.forEach((fecha) => {
        let nuevoTurno: Turnos = {
          fecha:fecha,
          box: (this.boxSelected ? this.boxSelected.nombre : ''),
          servicio: (this.servicioSelected ? this.servicioSelected.nombre : '')  ,
          paciente: this.pacienteSelected,
          horaFin: this.rangeTime.get("end").value,
          horaInicio: this.rangeTime.get("start").value,
          estado : this.estadoSelected
        }
        turnos.push(nuevoTurno)
      })
      const response = await this.turnosSrv.putArray(turnos)
      if (response) {
        this.onClose(true);
      } else {
        throw new Error("No se pudo agendar los turnos");
        
     }
    } catch (error) {
      this.errorHandler.handler(error)
      this.onClose(false)
    }

  }

  onClose(state) {
    this.dialogRef.close(state)
  }
}
