import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { NgxNeoModalModule } from '@neocomplexx/ngx-neo-modal';
import { FormsModule } from '@angular/forms';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives';
import { NgxNeoPipesModule } from '@neocomplexx/ngx-neo-pipes';

@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PerfilRoutingModule,
    NgxNeoPipesModule,
    NgxNeoModalModule,
    NgxNeoDirectivesModule
  ]
})
export class PerfilModule { }
