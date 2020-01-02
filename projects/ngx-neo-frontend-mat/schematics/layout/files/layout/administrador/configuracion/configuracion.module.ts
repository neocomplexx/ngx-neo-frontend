import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { ConfiguracionComponent } from './configuracion.component';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives-mat';
import { MaterialSharedModule } from '../../../shared/material/material.module';
import { NgxNeoComponentsModule } from '@neocomplexx/ngx-neo-components-mat';

@NgModule({
  declarations: [
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    NgxNeoDirectivesModule,
    MaterialSharedModule,
    NgxNeoComponentsModule
  ]
})
export class ConfiguracionModule { }
