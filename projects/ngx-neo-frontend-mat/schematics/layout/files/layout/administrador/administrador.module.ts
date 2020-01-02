import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './administrador.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { NgxNeoModalModule } from '@neocomplexx/ngx-neo-modal';

@NgModule({
  declarations: [AdministradorComponent],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    NgxNeoModalModule
  ]
})
export class AdministradorModule { }
