import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    DemoMaterialModule,
    FormsModule,ReactiveFormsModule
    
  ]
})
export class UserModule { }
