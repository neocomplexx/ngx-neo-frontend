import { Location } from '@angular/common';
import { Injectable, OnDestroy, ElementRef } from '@angular/core';
import { ITabChangeController } from '@neocomplexx/ngx-neo-directives-mat';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { UserDTO } from '../models/DTO/user.DTO';
import { PushService } from './push/signalr.push.service';
import { CordovaService } from './cordova/cordova.service';
import { ExceptionManagerService } from './exception-manager/exception-manager.service';
import { AuthenticationService } from '../helpers/auth/authentication.service';
import { HeaderService } from '@neocomplexx/ngx-neo-components-mat';
import { MobileSidebarService } from '@neocomplexx/ngx-neo-components-mat';
import { UsersServiceBackend } from './backend';
import { NgxNeoModalMatService, AlertButton } from '@neocomplexx/ngx-neo-modal-mat';
import { MatDialog } from '@angular/material/dialog';

export abstract class HeaderNeoComplexxService extends HeaderService implements ITabChangeController, OnDestroy {

    protected currentUserWeb: any;
    protected userEntity: any;

    public userTypeId: number;
    public userType: string;
    public userRole: string;
    public userLogged: UserDTO;

    public changed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public componentSelected: string;

    public beforeBack: (beforeBackArgs: BeforeBackArgs) => void;

    public canShowWithoutConnectionBanner: boolean;
    public withoutConnection$ = new Subject<boolean>();

    requestLoad = new Subject<any>();
    loadComplete = new Subject<any>();

    private subscriptions = new Subscription();

    /** auto scroll section */
    public scrolleableComponent: ElementRef;
    public scrollSavedActivated = false;
    public currentElement: string;

    public loggedOut$ = new Subject();

    public next: () => Promise<void> = async () => { console.log('next'); };

    constructor(protected router: Router, protected location: Location, protected ngxNeoModalService: NgxNeoModalMatService,
        protected signalRService: PushService,
        protected authenticationService: AuthenticationService,
        mobileSidebarService: MobileSidebarService,
        protected usersServiceBackend: UsersServiceBackend, protected modalService: MatDialog,
        protected breadCrumbService: BreadcrumbService, protected cordovaService: CordovaService,
        protected exceptionService: ExceptionManagerService) {
        super(mobileSidebarService);
        this.userType = '';
        this.userLogged = new UserDTO();

        this.getItemFromLocalStorage();

        window.addEventListener('popstate', (event) => {
            // The popstate event is fired each time when the current history entry changes.
            const beforeBackArgs: BeforeBackArgs = { path: '', cancelBack: false };
            if (this.beforeBack) {
                this.beforeBack(beforeBackArgs);
                this.removeScrollSaved();
            }
        }, false);

        this.location.subscribe(x => {
            if (this.mobileSidebarService.isOpen) {
                this.mobileSidebarService.showSidebar.next(false);
            }
        });

        router.events.subscribe((url: NavigationEnd) => {
            if (url instanceof NavigationEnd) {
                this.setComponentSelectedName(url.url);
            }
        });

        this.authenticationService.loggedEvent.subscribe(async (authResponseDTO) => {
            if (authResponseDTO) {
                await this.initializeActualUser();
            }
        });

        this.subscriptions.add(this.signalRService.onConectedToServer(() => this.withoutConnection$.next(false)));
    }

    public notifyWithoutConnection(): void {
        if (this.canShowWithoutConnectionBanner) {
            this.withoutConnection$.next(true);
        } else {
            window.alert('El sistema no se encuentra disponible en este momento, intente nuevamente más tarde.');
        }
    }

    private setComponentSelectedName(url: string): void {
        if (url) {
            const pos = url.lastIndexOf('/') + 1;
            if (pos > 0) {
                const urlFriendly: string = this.breadCrumbService.getFriendlyNameForRoute(url);
                this.componentSelected = this.toPascalCase(urlFriendly); // this.toPascalCase(url.substring(pos));
            } else {
                this.componentSelected = '';
            }
        }
    }

    public abstract async getUserEntityById(): Promise<void>;

    public getUserEntity<T>(): T {
        if (this.userEntity) {
            return <T>this.userEntity;
        } else {
            return undefined;
        }
    }


    private getItemFromLocalStorage(): void {
        this.currentUserWeb = JSON.parse(localStorage.getItem('currentUserWeb'));
        if (this.currentUserWeb) {
            this.userLogged.id = this.currentUserWeb.id;
        }
        if (this.currentUserWeb && this.currentUserWeb.role) {
            this.userType = this.currentUserWeb.userType; // === 'administrative' || currentUserWeb.userType === 'administrator');
            this.userTypeId = this.currentUserWeb.userTypeId;
            this.userRole = this.currentUserWeb.role.name;
        } else {
            this.userTypeId = 0;
        }
    }

    public async initializeActualUser(): Promise<void> {
        this.getItemFromLocalStorage();
        this.userLogged = await this.usersServiceBackend.getUsersUsernameUSERNAME(this.currentUserWeb.userName);
        await this.getUserEntityById();
    }


    public dispose(): void {
        this.userLogged = new UserDTO();
        this.currentUserWeb = null;
        this.userType = '';
        this.authenticationService.removeInfoLogin();
        this.userEntity = undefined;
    }

    public notifyChange(changed: boolean): void {
        this.changed.next(changed);
    }

    public navigateToComponent(component: string) {
        this.router.navigate([component]);
    }

    public destroyComponent(): void {
        this.changed.next(false);
    }
    public closeComponent(): void {
        this.destroyComponent();
        this.back();
    }

    public IsLogged(): boolean {
        return (this.userLogged && this.userLogged.id > 0);
    }

    public async Logout(): Promise<void> {
        await this.authenticationService.logout();
        this.dispose();
        this.loggedOut$.next(true);
        if (this.cordovaService.isIOSApp) {
            this.router.navigate(['/ios-landing']);
        } else {
            this.router.navigate(['/login']);
        }
    }

    public getUserName() {
        return this.userLogged.fullName;
    }

    public isAdmin() {
        return this.userType === 'administrator';
    }

    public async back(): Promise<void> {

        this.modalService.closeAll();

        if (this.changed.value) {
            const result = await this.ngxNeoModalService.decision('Hay cambios sin guardar. ¿Está seguro de salir y perderlos?',
                '', 'Ahora podrá guardarlos...');
            if (result.ButtonResponse != AlertButton.Accept) {
                return;
            } else {
                this.notifyChange(false);
            }
        }

        const ruta = this.router.url;

        const beforeBackArgs: BeforeBackArgs = { path: ruta, cancelBack: false };
        if (this.beforeBack) {
            this.beforeBack(beforeBackArgs);
        }

        this.beforeBack = undefined;
        this.removeScrollSaved();

        if (!beforeBackArgs.cancelBack) {
            this.location.back();
        }
    }

    public removeScrollSaved(): void {
        const neoComponentAsyncName = localStorage.getItem('NeoComponentAsync');
        if (neoComponentAsyncName) {
            const scrolls = JSON.parse(localStorage.getItem('scroll'));
            if (scrolls) {
                delete scrolls[neoComponentAsyncName];
                localStorage.setItem('scroll', JSON.stringify(scrolls));
            }
        }
        this.scrollToZero();
    }

    /**
     * Metodo de decision si se debe cambiar de tab o para las ventanas con tabs.
     * */
    public async canChangeTab(): Promise<boolean> {
        if (this.changed.value) {
            const result = await this.ngxNeoModalService.decision(
                'Hay cambios sin guardar, esta seguro de salir y perderlos?', '', 'Ahora podrá guardarlos...'
            );
            if (result.ButtonResponse === AlertButton.Accept) {
                this.destroyComponent();
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    private toPascalCase(str: string): string {
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    }

    public HandleErrorMessage(error, frendlyErrorMessage?: string | null) {
        this.exceptionService.HandleErrorMessage(error, frendlyErrorMessage);
    }

    public scrollToPosition(x: number, y: number) {
        if (this.scrolleableComponent) {
            this.scrolleableComponent.nativeElement.scrollTop = y;
        }
    }

    public scrollToZero() {
        this.scrollToPosition(0, 0);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}

export interface BeforeBackArgs {
    cancelBack: boolean;

    path: string;
}
