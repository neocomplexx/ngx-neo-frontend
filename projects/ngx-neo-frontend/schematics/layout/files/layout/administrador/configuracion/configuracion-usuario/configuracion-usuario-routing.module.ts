import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionUsuarioComponent } from './configuracion-usuario.component';

const routes: Routes = [
  { path: '', component: ConfiguracionUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionUsuarioRoutingModule { }
