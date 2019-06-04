import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgxNeoModalService } from '@neocomplexx/ngx-neo-modal';
import { UsersServiceBackend, PushService, HeaderNeoComplexxService, CordovaService } from '@neocomplexx/ngx-neo-frontend';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExceptionManagerService } from '@neocomplexx/ngx-neo-frontend';
import { AuthenticationService } from '@neocomplexx/ngx-neo-frontend';
import { MobileSidebarService } from '@neocomplexx/ngx-neo-components';

@Injectable({
    providedIn: 'root'
})
export class Header<%=classify(projectName)%>Service extends HeaderNeoComplexxService {

    constructor(router: Router, location: Location, ngxNeoModalService: NgxNeoModalService,
        signalRService: PushService, authenticationService: AuthenticationService,  mobileSidebarService: MobileSidebarService,
        usersServiceBackend: UsersServiceBackend, modalService: NgbModal, cordovaService: CordovaService,
        breadCrumbService: BreadcrumbService,
        exceptionService: ExceptionManagerService) {
        super(router, location, ngxNeoModalService, signalRService, authenticationService, mobileSidebarService,
            usersServiceBackend, modalService, breadCrumbService, cordovaService, exceptionService);

            this.router.events.subscribe((ev: any) => {
                if (this.router.url === '' || this.router.url === '/user' ||
                  this.router.url === '/admin' || this.router.url === '/') {
                  this.hideReturn$.next(true);
                } else {
                  this.hideReturn$.next(false);
                }
              });
    }

    public async getUserEntityById(): Promise <void> {
        if (this.userTypeId > 0) {
        this.userEntity = null; // call to user backend service
        } else {
            this.userEntity = undefined;
        }
    }
}
