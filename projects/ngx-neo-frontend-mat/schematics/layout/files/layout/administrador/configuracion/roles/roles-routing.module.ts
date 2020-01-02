import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesConsultaComponent } from './roles-consulta/roles-consulta.component';
import { RolesAltaComponent } from './roles-alta/roles-alta.component';
import { RolesPermisosComponent } from './roles-permisos/roles-permisos.component';

const routes: Routes = [
  { path: '', component: RolesConsultaComponent },
  { path: 'roles-alta', component: RolesAltaComponent },
  { path: 'roles-permisos', component: RolesPermisosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
