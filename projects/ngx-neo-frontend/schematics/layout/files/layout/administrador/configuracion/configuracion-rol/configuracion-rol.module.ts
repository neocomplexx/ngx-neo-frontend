import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionRolRoutingModule } from './configuracion-rol-routing.module';
import { ConfiguracionRolComponent } from './configuracion-rol.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ConfiguracionRolGeneracionComponent } from './configuracion-rol-generacion/configuracion-rol-generacion.component';
import { ConfiguracionRolConsultaComponent } from './configuracion-rol-consulta/configuracion-rol-consulta.component';
import { TreeviewModule } from 'ngx-treeview';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives';
import { NgxNeoPipesModule } from '@neocomplexx/ngx-neo-pipes';
import { ConfiguracionRolPermisosComponent } from './configuracion-rol-permisos/configuracion-rol-permisos.component';
import { NgxNeoModalModule } from '@neocomplexx/ngx-neo-modal';

@NgModule({
  declarations: [
    ConfiguracionRolComponent,
    ConfiguracionRolGeneracionComponent,
    ConfiguracionRolConsultaComponent,
    ConfiguracionRolPermisosComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRolRoutingModule,
    NgbModule,
    FormsModule,
    NgxNeoDirectivesModule,
    NgxNeoPipesModule,
    NgxNeoModalModule,
    TreeviewModule.forRoot()
  ]
})
export class ConfiguracionRolModule { }
