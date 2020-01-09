import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorDashboardRoutingModule } from './administrador-dashboard-routing.module';
import { AdministradorDashboardComponent } from './administrador-dashboard.component';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [AdministradorDashboardComponent],
  imports: [
    CommonModule,
    AdministradorDashboardRoutingModule,
    MaterialSharedModule
  ]
})
export class AdministradorDashboardModule { }
