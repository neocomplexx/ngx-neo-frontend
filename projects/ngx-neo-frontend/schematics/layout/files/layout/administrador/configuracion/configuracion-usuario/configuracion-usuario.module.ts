import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionUsuarioRoutingModule } from './configuracion-usuario-routing.module';
import { ConfiguracionUsuarioComponent } from './configuracion-usuario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfiguracionUsuarioGeneracionComponent } from './configuracion-usuario-generacion/configuracion-usuario-generacion.component';
import { FormsModule } from '@angular/forms';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives';
import { NgxNeoPipesModule } from '@neocomplexx/ngx-neo-pipes';
import { ConfiguracionUsuarioConsultaComponent } from './configuracion-usuario-consulta/configuracion-usuario-consulta.component';
import { UserRefreshPasswordComponent } from './configuracion-usuario-consulta/usuario-refresh-password/user-refresh-password.component';
import { NgxNeoCompleterModule } from '@neocomplexx/ngx-neo-completer';
import { NgxNeoModalModule } from '@neocomplexx/ngx-neo-modal';

@NgModule({
  declarations: [
    ConfiguracionUsuarioComponent,
    ConfiguracionUsuarioGeneracionComponent,
    ConfiguracionUsuarioConsultaComponent,
    UserRefreshPasswordComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionUsuarioRoutingModule,
    NgbModule,
    FormsModule,
    NgxNeoDirectivesModule,
    NgxNeoPipesModule,
    NgxNeoCompleterModule,
    NgxNeoModalModule
  ],
  entryComponents: [
    UserRefreshPasswordComponent
  ]
})
export class ConfiguracionUsuarioModule { }
