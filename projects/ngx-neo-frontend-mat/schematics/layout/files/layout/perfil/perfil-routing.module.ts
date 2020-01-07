import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { NgxNeoModalMatModule } from '@neocomplexx/ngx-neo-modal-mat';

const routes: Routes = [
 { path: '', component: PerfilComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxNeoModalMatModule],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
