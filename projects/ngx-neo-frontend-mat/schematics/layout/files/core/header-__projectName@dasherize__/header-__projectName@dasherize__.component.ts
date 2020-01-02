import { Component, OnInit } from '@angular/core';
import { CordovaService } from '@neocomplexx/ngx-neo-frontend';
import { Header<%=classify(projectName)%>Service } from './header-<%=dasherize(projectName)%>.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-<%=dasherize(projectName)%>',
  templateUrl: './header-<%=dasherize(projectName)%>.component.html'
})
export class Header<%=classify(projectName)%>Component implements OnInit {

  constructor(private cordovaService: CordovaService,
    protected headerService: Header<%=classify(projectName)%>Service, public router: Router) {
      this.headerService.canShowWithoutConnectionBanner = true;
  }

  ngOnInit() {
  }

  
  public isIos(): boolean {
    return this.cordovaService.isIOSApp;
  }

  public logout() {
    this.headerService.Logout();
  }

}
