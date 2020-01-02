import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives';
import { NgxNeoCompleterModule } from '@neocomplexx/ngx-neo-completer';
import { NotificacionesConsultaComponent } from './notificaciones-consulta/notificaciones-consulta.component';
import { NotificacionesComponent } from './notificaciones.component';
import { NotificacionesRoutingModule } from './notificaciones-routing.module';
import { NotificacionesGeneracionComponent } from './notificaciones-generacion/notificaciones-generacion.component';
import { NgxNeoComponentsModule } from '@neocomplexx/ngx-neo-components';
import { NgxNeoModalModule } from '@neocomplexx/ngx-neo-modal';

@NgModule({
  imports: [
    CommonModule,
    NotificacionesRoutingModule,
    NgbModule,
    FormsModule,
    NgxNeoDirectivesModule,
    NgxNeoCompleterModule,
    NgxNeoComponentsModule,
    NgxNeoModalModule
  ],
  declarations: [
    NotificacionesComponent,
    NotificacionesConsultaComponent,
    NotificacionesGeneracionComponent
  ]
})
export class NotificacionesModule { }
