import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosComponent } from './turnos.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TurnosComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class TurnosModule { }
