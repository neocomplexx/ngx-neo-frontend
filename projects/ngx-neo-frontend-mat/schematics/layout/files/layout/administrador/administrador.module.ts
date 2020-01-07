import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './administrador.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { NgxNeoModalMatModule } from '@neocomplexx/ngx-neo-modal-mat';

@NgModule({
  declarations: [AdministradorComponent],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    NgxNeoModalMatModule
  ]
})
export class AdministradorModule { }
