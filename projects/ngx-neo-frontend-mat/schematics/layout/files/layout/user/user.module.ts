import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    MaterialSharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
