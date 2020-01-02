import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxNeoCompleterMatModule } from '@neocomplexx/ngx-neo-completer-mat';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives-mat';
import { RolesConsultaComponent } from './roles-consulta/roles-consulta.component';
import { RolesAltaComponent } from './roles-alta/roles-alta.component';
import { RolesPermisosComponent } from './roles-permisos/roles-permisos.component';
import { MaterialSharedModule } from '../../../../shared/material/material.module';
import { TreeviewModule } from 'ngx-treeview/src/treeview.module';

@NgModule({
  declarations: [
    RolesConsultaComponent,
    RolesAltaComponent,
    RolesPermisosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxNeoCompleterMatModule,
    NgxNeoDirectivesModule,
    MaterialSharedModule,
    RolesRoutingModule,
    TreeviewModule.forRoot(),
  ]
})
export class RolesModule { }
