import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { AppModule } from '../app.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DemoMaterialModule } from '../demo-material-module';
import { AppSidebarComponent } from '../layouts/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PagesComponent,
    AppSidebarComponent
  ],
  imports: [
    CommonModule, 
    PagesRoutingModule,
    SharedModule,
    DemoMaterialModule,
    RouterModule
  ]
})
export class PagesModule { }
