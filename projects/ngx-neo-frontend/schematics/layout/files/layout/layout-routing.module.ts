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
        loadChildren: './notificaciones/notificaciones.module#NotificacionesModule',
      },
      {
        path: 'admin',
        loadChildren: './administrador/administrador.module#AdministradorModule',
        data: { expectedType: 'administrator' },
        canActivate: [UserTypeGuard],
      },
      {
        path: 'user',
        loadChildren: './cliente/cliente.module#ClienteModule',
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
