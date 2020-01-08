import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { UserDecisionGuard, UserTypeGuard, UserTypes } from '@neocomplexx/ngx-neo-frontend-mat';

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
        data: { expectedType: UserTypes.Administrator },
        canActivate: [UserTypeGuard],
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: { expectedTypes: [UserTypes.Professional, UserTypes.User] },
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
