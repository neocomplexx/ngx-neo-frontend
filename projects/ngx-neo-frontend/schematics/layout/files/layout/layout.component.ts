import { Component, ElementRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MobileSidebarService } from '@neocomplexx/ngx-neo-components';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  public scrolledElement: ElementRef;
  public isMobile = false;
  public resizeSubscription: Subscription = new Subscription();


  constructor(
    private mobileSidebarService: MobileSidebarService,
    private breakpointObserver: BreakpointObserver, ) {

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

  ngOnInit() {

  }

  @HostListener('swipeleft', ['$event'])
  public hideSidebar($event) {
    this.mobileSidebarService.showSidebar.next(false);
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

}
