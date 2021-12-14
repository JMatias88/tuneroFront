import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { PacientesTableComponent } from './components/pacientes-table/pacientes-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacientesFormComponent } from './components/pacientes-form/pacientes-form.component';


@NgModule({
  declarations: [
    PacientesComponent,
    PacientesTableComponent,
    PacientesFormComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    DemoMaterialModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class PacientesModule { }
