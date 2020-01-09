import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxNeoComponentsModule } from '@neocomplexx/ngx-neo-components-mat';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { CoreModule } from '../core/core.module';
import { NgxNeoModalMatModule } from '@neocomplexx/ngx-neo-modal-mat';
import { MaterialSharedModule } from '../shared/material/material.module';
@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgxNeoComponentsModule,
    CoreModule,
    NgxNeoModalMatModule,
    MaterialSharedModule
  ]
})
export class LayoutModule { }
