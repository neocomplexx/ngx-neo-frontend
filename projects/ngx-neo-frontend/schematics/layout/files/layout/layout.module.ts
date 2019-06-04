import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxNeoComponentsModule } from '@neocomplexx/ngx-neo-components';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { CoreModule } from '../core/core.module';
import { NgxNeoModalModule } from '@neocomplexx/ngx-neo-modal';
@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgxNeoComponentsModule,
    CoreModule,
    NgxNeoModalModule
  ]
})
export class LayoutModule { }
