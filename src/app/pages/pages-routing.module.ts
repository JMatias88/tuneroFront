import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: '',
    component:PagesComponent,
    children: [
      {
        path: 'usuarios',
        loadChildren : () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'home',
        loadChildren : () =>  import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'pacientes',
        loadChildren : () => import('./pacientes/pacientes.module').then(m => m.PacientesModule)
      },
      {
        path: 'obra-social',
        loadChildren: () => import('./obra-social/obra-social.module').then(m => m.ObraSocialModule)
      },
      {
        path: 'servicios',
        loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosModule)
      },
      {
        path: 'boxes',
        loadChildren : () =>  import('./boxes/boxes.module').then(m => m.BoxesModule)
      },
      {
        path: 'turnos',
        loadChildren: () => import('./turnos/turnos.module').then(m => m.TurnosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
