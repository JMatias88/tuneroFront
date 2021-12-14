import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@core/guards/auth.guard';




const routes: Routes = [
  {
    path: 'pages',
    canActivate:[AuthGuard],
    loadChildren : () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'auth',
    loadChildren : () => import('./core/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '', redirectTo: 'pages/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/home' },
  // {
  //   path: '',
  //   redirectTo: '/main',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'main',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('@modules/home/home.module').then(d => d.HomeModule)
  // },
  // {
  //   path: 'auth',
  //   loadChildren : () => import('@modules/auth/auth.module').then(d => d.AuthModule)
  // },
  // { path: '**', redirectTo: '/auth', pathMatch: 'full' }
  // {
  //   path: 'home',
  //   loadChildren: () => import('@modules/home/home.module').then(d => d.HomeModule),
  //   canActivate:[AuthGuard]
  // }
  // {
  //   path: 'dashboard',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   component: DashboardPageComponent
  // },
  // {
  //   path: 'typography',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./pages/typography/typography.module').then(m => m.TypographyModule)
  // },
  // {
  //   path: 'tables',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./pages/tables/tables.module').then(m => m.TablesModule)
  // },
  // {
  //   path: 'notification',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationModule)
  // },
  // {
  //   path: 'ui',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./pages/ui-elements/ui-elements.module').then(m => m.UiElementsModule)
  // },
  // {
  //   path: '404',
  //   component: NotFoundComponent
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  // },
  // {
  //   path: '**',
  //   redirectTo: '404'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
