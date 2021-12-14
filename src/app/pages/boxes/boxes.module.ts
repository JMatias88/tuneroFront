import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxesRoutingModule } from './boxes-routing.module';
import { BoxesComponent } from './boxes.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { BoxesTableComponent } from './components/boxes-table/boxes-table.component';


@NgModule({
  declarations: [
    BoxesComponent,
    BoxesTableComponent
  ],
  imports: [
    CommonModule,
    BoxesRoutingModule,
    DemoMaterialModule
  ]
})
export class BoxesModule { }
