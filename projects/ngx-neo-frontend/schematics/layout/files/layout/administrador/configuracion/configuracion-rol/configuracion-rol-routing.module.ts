import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionRolComponent } from './configuracion-rol.component';

const routes: Routes = [
  { path: '', component: ConfiguracionRolComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRolRoutingModule { }
