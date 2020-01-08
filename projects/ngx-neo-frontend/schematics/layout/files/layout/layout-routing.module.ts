import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { UserDecisionGuard, UserTypeGuard } from '@neocomplexx/ngx-neo-frontend';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '',
        canActivate: [UserDecisionGuard],
        pathMatch: 'full'
      },
      {
        path: 'notifications',
        loadChildren: () => import('./notificaciones/notificaciones.module').then(m => m.NotificacionesModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorModule),
        data: { expectedType: 'administrator' },
        canActivate: [UserTypeGuard],
      },
      {
        path: 'user',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
        data: { expectedTypes: ['professional', 'user'] },
        canActivate: [UserTypeGuard],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
