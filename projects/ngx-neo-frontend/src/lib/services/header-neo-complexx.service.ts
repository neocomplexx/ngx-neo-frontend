import { Location } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { ITabChangeController } from '@neocomplexx/ngx-neo-directives';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { NgxNeoModalService, AlertButton } from '@neocomplexx/ngx-neo-modal';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDTO } from '../models/DTO/User.DTO';
import { PushService } from './push/signalr.push.service';
import { CordovaService } from './cordova/cordova.service';
import { ExceptionManagerService } from './exception-manager/exception-manager.service';
import { AuthenticationService } from '../helpers/auth/authentication.service';
import { UsersServiceBackend } from './backend/users.service.backend';
import { HeaderService } from '@neocomplexx/ngx-neo-components';
import { MobileSidebarService } from '@neocomplexx/ngx-neo-components';

export abstract class HeaderNeoComplexxService extends HeaderService implements ITabChangeController, OnDestroy {

    private currentUserWeb: any;
    private userEntity: any;

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

    constructor(protected router: Router, protected location: Location, protected ngxNeoModalService: NgxNeoModalService,
        protected signalRService: PushService,
        protected authenticationService: AuthenticationService,
        mobileSidebarService: MobileSidebarService,
        protected usersServiceBackend: UsersServiceBackend, protected modalService: NgbModal,
        protected breadCrumbService: BreadcrumbService, protected cordovaService: CordovaService,
        protected exceptionService: ExceptionManagerService) {
        super(mobileSidebarService);
        this.userType = '';
        this.userLogged = new UserDTO();

        this.getItemFromLocalStorage();

        this.location.subscribe(x => {
            if (x.pop) {
                this.removeScrollSaved();
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
        if (this.canShowWithoutConnectionBanner && !this.modalService.hasOpenModals()) {
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

    public EstaLogueado(): boolean {
        return (this.userLogged && this.userLogged.id > 0);
    }

    public async Loggedout(): Promise<void> {
        await this.authenticationService.logout();
        this.dispose();
        if (this.cordovaService.isIOSApp) {
            this.router.navigate(['/ios-landing']);
        } else {
            this.router.navigate(['/login']);
        }
    }

    public back(): void {

        if (this.modalService.hasOpenModals()) {
            this.modalService.dismissAll();
            return;
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
        window.scrollTo(0, 0);
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

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}

export interface BeforeBackArgs {
    cancelBack: boolean;

    path: string;
}
