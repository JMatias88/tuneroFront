import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObraSocialComponent } from './obra-social.component';

const routes: Routes = [
  {
    path: '',
    component:ObraSocialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObraSocialRoutingModule { }
