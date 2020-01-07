import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgxNeoModalMatService } from '@neocomplexx/ngx-neo-modal-mat';
import { MobileSidebarService } from '@neocomplexx/ngx-neo-components-mat';
import { UsersServiceBackend, PushService, HeaderNeoComplexxService, CordovaService, AuthenticationService, ExceptionManagerService } from '@neocomplexx/ngx-neo-frontend-mat';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class Header<%=classify(projectName)%>Service extends HeaderNeoComplexxService {

    constructor(router: Router, location: Location,
        signalRService: PushService, authenticationService: AuthenticationService, mobileSidebarService: MobileSidebarService,
        usersServiceBackend: UsersServiceBackend, cordovaService: CordovaService,
        breadCrumbService: BreadcrumbService, exceptionService: ExceptionManagerService, modalService: MatDialog, 
        ngxNeoModalService: NgxNeoModalMatService) {
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
        if (this.IsLogged() && this.userLogged.userTypeId) {
        this.userEntity = null; // call to user backend service
        } else {
            this.userEntity = undefined;
        }
    }
}
