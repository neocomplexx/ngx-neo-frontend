import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosConsultaComponent } from './usuarios-consulta/usuarios-consulta.component';
import { UsuariosAltaComponent } from './usuarios-alta/usuarios-alta.component';

const routes: Routes = [
  { path: '', component: UsuariosConsultaComponent },
  { path: 'usuarios-alta', component: UsuariosAltaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
