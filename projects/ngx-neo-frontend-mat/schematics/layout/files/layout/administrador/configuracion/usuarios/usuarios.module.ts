import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives-mat';
import { NgxNeoModalMatModule } from '@neocomplexx/ngx-neo-modal-mat';
import { NgxNeoCompleterMatModule } from '@neocomplexx/ngx-neo-completer-mat';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosConsultaComponent } from './usuarios-consulta/usuarios-consulta.component';
import { UsuariosAltaComponent } from './usuarios-alta/usuarios-alta.component';
import { FormsModule } from '@angular/forms';
import { UserRefreshPasswordComponent } from './usuario-refresh-password/user-refresh-password.component';
import { NgxNeoComponentsModule } from '@neocomplexx/ngx-neo-components-mat';

@NgModule({
  declarations: [
    UsuariosConsultaComponent,
    UsuariosAltaComponent,
    UserRefreshPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuariosRoutingModule,
    MaterialSharedModule,
    NgxNeoDirectivesModule,
    NgxNeoModalMatModule,
    NgxNeoCompleterMatModule,
    NgxNeoComponentsModule
  ],
  entryComponents: [
    UserRefreshPasswordComponent
  ]
})
export class UsuariosModule { }
