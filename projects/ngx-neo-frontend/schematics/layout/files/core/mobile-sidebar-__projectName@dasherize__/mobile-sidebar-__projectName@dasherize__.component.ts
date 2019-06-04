import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';

@Component({
  selector: 'app-mobile-sidebar-<%=dasherize(projectName)%>',
  templateUrl: './mobile-sidebar-<%=dasherize(projectName)%>.component.html'
})
export class MobileSidebar<%=classify(projectName)%>Component implements OnInit, OnDestroy {

  public isMobile = false;

  public resizeSubscription: Subscription = new Subscription();

  public get esUsuarioAdministrador() { return this.headerService.isAdmin(); }

  constructor(private breakpointObserver: BreakpointObserver, protected headerService: Header<%=classify(projectName)%>Service) { }

  ngOnInit() {
    this.resizeSubscription.add(this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }));
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }
}
