import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObraSocialRoutingModule } from './obra-social-routing.module';
import { ObraSocialComponent } from './obra-social.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { ObraSocialTableComponent } from './components/obra-social-table/obra-social-table.component';
import { ObraSocialFormComponent } from './components/obra-social-form/obra-social-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ObraSocialComponent,
    ObraSocialTableComponent,
    ObraSocialFormComponent
  ],
  imports: [
    CommonModule,
    ObraSocialRoutingModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ObraSocialModule { }
