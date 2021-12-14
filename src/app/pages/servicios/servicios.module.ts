import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';
import { ServiciosTableComponent } from './components/servicios-table/servicios-table.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';


@NgModule({
  declarations: [
    ServiciosComponent,
    ServiciosTableComponent
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    DemoMaterialModule
  ]
})
export class ServiciosModule { }
