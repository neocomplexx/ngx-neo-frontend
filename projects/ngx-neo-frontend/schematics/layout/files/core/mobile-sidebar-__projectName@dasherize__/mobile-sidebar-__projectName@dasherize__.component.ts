import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MobileSidebarService } from '@neocomplexx/ngx-neo-components';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MobileSidebarService } from '@neocomplexx/ngx-neo-components';
import { Header<%=classify(projectName)%>Service } from 'src/app/core/header-<%=dasherize(projectName)%>/header-<%=dasherize(projectName)%>.service';

@Component({
  selector: 'app-mobile-sidebar-<%=dasherize(projectName)%>',
  templateUrl: './mobile-sidebar-<%=dasherize(projectName)%>.component.html'
})
export class MobileSidebar<%=classify(projectName)%>Component implements OnInit, OnDestroy {

  public isMobile = false;

  public resizeSubscription: Subscription = new Subscription();

  public logOutCmd: ICommand = new Command(() => this.onLoggedout(), new BehaviorSubject(true), true);

  public get esUsuarioAdministrador() { return this.headerService.isAdmin(); }

  public get estaLogueado() { return this.headerService.IsLogged(); }

  constructor(private breakpointObserver: BreakpointObserver, protected headerService: Header<%=classify(projectName)%>Service,
    private mobileSidebarService: MobileSidebarService, private router: Router) { }

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

  
  public async onLoggedout() {
    await this.headerService.Logout();
  }

  public navigate(event, route: string) {
    event.preventDefault();
    event.stopPropagation();
    this.mobileSidebarService.showSidebar.next(false);
    this.router.navigate([route]);
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }
}
