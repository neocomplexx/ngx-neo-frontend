import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header<%=classify(projectName)%>Component } from './header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.component';
import { Footer<%=classify(projectName)%>Component } from './footer-<%=dasherize(projectName)%>/footer-<%=dasherize(projectName)%>.component';
import { Sidebar<%=classify(projectName)%>Component } from './sidebar-<%=dasherize(projectName)%>/sidebar-<%=dasherize(projectName)%>.component';
import { MobileSidebar<%=classify(projectName)%>Component } from './mobile-sidebar-<%=dasherize(projectName)%>/mobile-sidebar-<%=dasherize(projectName)%>.component';
import { NgxNeoComponentsModule } from '@neocomplexx/ngx-neo-components';
import { RouterModule } from '@angular/router';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives';

@NgModule({
  declarations: [
    Header<%=classify(projectName)%>Component,
    Footer<%=classify(projectName)%>Component,
    Sidebar<%=classify(projectName)%>Component,
    MobileSidebar<%=classify(projectName)%>Component
  ],
  imports: [
    CommonModule,
    NgxNeoComponentsModule,
    RouterModule,
    NgxNeoDirectivesModule
  ],
  exports: [
    Header<%=classify(projectName)%>Component,
    Footer<%=classify(projectName)%>Component,
    Sidebar<%=classify(projectName)%>Component,
    MobileSidebar<%=classify(projectName)%>Component
  ]
})
export class CoreModule { }
