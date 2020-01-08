import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './configuracion.component';

const routes: Routes = [
  { path: '', component: ConfiguracionComponent },
  {
    path: 'configuracion-usuario',
    loadChildren: () => import('./configuracion-usuario/configuracion-usuario.module').then(m => m.ConfiguracionUsuarioModule)
  },
  {
    path: 'configuracion-rol',
    loadChildren: () => import('./configuracion-rol/configuracion-rol.module').then(m => m.ConfiguracionRolModule)
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
