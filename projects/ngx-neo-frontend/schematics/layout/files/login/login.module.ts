import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxNeoModalModule } from '@neocomplexx/ngx-neo-modal';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    NgxNeoDirectivesModule,
    NgbModule,
    NgxNeoModalModule,
    RouterModule,
    CoreModule
  ],
  declarations: [
    LoginComponent,
    ForgetPassComponent,
  ],
  entryComponents: [
    ForgetPassComponent,
  ]
})
export class LoginModule { }
