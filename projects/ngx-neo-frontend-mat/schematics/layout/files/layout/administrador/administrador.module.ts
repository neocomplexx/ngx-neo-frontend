import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './administrador.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { NgxNeoModalMatModule } from '@neocomplexx/ngx-neo-modal-mat';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [AdministradorComponent],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    NgxNeoModalMatModule,
    MaterialSharedModule
  ]
})
export class AdministradorModule { }
