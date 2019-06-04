import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './configuracion.component';

const routes: Routes = [
  { path: '', component: ConfiguracionComponent },
  {
    path: 'configuracion-usuario',
    loadChildren: './configuracion-usuario/configuracion-usuario.module#ConfiguracionUsuarioModule'
  },
  {
    path: 'configuracion-rol',
    loadChildren: './configuracion-rol/configuracion-rol.module#ConfiguracionRolModule'
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
