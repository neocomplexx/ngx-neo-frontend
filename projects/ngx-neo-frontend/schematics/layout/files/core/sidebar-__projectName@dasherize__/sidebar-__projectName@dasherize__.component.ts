import { Component, OnInit } from '@angular/core';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';

@Component({
  selector: 'app-sidebar-<%=dasherize(projectName)%>',
  templateUrl: './sidebar-<%=dasherize(projectName)%>.component.html'
})
export class Sidebar<%=classify(projectName)%>Component implements OnInit {

  public get esUsuarioAdministrador() { return this.headerService.isAdmin(); }

  constructor( protected headerService: Header<%=classify(projectName)%>Service) { }

  ngOnInit() {
  }

}
