import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives-mat';
import { NgxNeoCompleterMatModule } from '@neocomplexx/ngx-neo-completer-mat';
import { NotificacionesConsultaComponent } from './notificaciones-consulta/notificaciones-consulta.component';
import { NotificacionesComponent } from './notificaciones.component';
import { NotificacionesRoutingModule } from './notificaciones-routing.module';
import { NotificacionesGeneracionComponent } from './notificaciones-generacion/notificaciones-generacion.component';
import { NgxNeoComponentsModule } from '@neocomplexx/ngx-neo-components-mat';
import { NgxNeoModalMatModule } from '@neocomplexx/ngx-neo-modal-mat';

@NgModule({
  imports: [
    CommonModule,
    NotificacionesRoutingModule,
    FormsModule,
    NgxNeoDirectivesModule,
    NgxNeoCompleterMatModule,
    NgxNeoComponentsModule,
    NgxNeoModalMatModule
  ],
  declarations: [
    NotificacionesComponent,
    NotificacionesConsultaComponent,
    NotificacionesGeneracionComponent
  ]
})
export class NotificacionesModule { }
