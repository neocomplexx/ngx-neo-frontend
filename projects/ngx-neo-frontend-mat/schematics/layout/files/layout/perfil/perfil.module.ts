import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { NgxNeoModalMatModule } from '@neocomplexx/ngx-neo-modal-mat';
import { FormsModule } from '@angular/forms';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives-mat';
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
    NgxNeoModalMatModule,
    NgxNeoDirectivesModule
  ]
})
export class PerfilModule { }
