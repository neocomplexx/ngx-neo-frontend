import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { ConfiguracionComponent } from './configuracion.component';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxNeoModalModule } from '@neocomplexx/ngx-neo-modal';

@NgModule({
  declarations: [
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    NgxNeoDirectivesModule,
    NgbModule,
    NgxNeoModalModule
  ]
})
export class ConfiguracionModule { }
