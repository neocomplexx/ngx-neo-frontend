import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { NgxNeoModalModule } from '@neocomplexx/ngx-neo-modal';

const routes: Routes = [
 { path: '', component: PerfilComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxNeoModalModule],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
