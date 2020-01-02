import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './configuracion.component';

const routes: Routes = [
  { path: '', component: ConfiguracionComponent },
  { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule' },
  { path: 'roles', loadChildren: './roles/roles.module#RolesModule' },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
