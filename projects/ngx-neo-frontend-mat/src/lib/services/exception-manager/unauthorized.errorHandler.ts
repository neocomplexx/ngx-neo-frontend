import { Injectable, Injector, ErrorHandler, NgZone, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxNeoModalMatService } from '@neocomplexx/ngx-neo-modal-mat';
import { AuthenticationService } from '../../helpers/auth/authentication.service';
import { CordovaService } from '../cordova/cordova.service';
import { HeaderNeoComplexxService } from '../header-neo-complexx.service';

export class UnauthorizedErrorHandler implements ErrorHandler {

  public originalAlert: any;
  private authenticationService: AuthenticationService;
  private router: Router;
  private cordovaService: CordovaService;
  private headerService: HeaderNeoComplexxService;
  private zone: NgZone;

  constructor(@Inject(Injector) private injector: Injector) {
  }

  async handleError(error: any): Promise<void> {
    // console.error(error);

    if (!this.headerService) { this.headerService = this.injector.get(HeaderNeoComplexxService); }
    if (!this.zone) { this.zone = this.injector.get(NgZone); }
    if (!this.originalAlert) { this.originalAlert = this.injector.get(NgxNeoModalMatService).originalAlert; }

    if (error.rejection) { // Si el error viene encapsulado en un Promise, el error en si, esta guardado en la variable rejection
      error = error.rejection;
    }

    if (error.status === 0 || error.status === 404) {
      this.zone.run(() => this.headerService.notifyWithoutConnection());
      return;
    }

    if (
      error.message.includes('Unauthorized') ||
      error.message.includes('connection being closed') ||
      (error.status && error.status === 401)
    ) {
      if (!this.authenticationService) { this.authenticationService = this.injector.get(AuthenticationService); }
      if (!this.router) { this.router = this.injector.get(Router); }
      if (!this.cordovaService) { this.cordovaService = this.injector.get(CordovaService); }
      if (!this.router.url.startsWith('/login') && !this.router.url.startsWith('/ios-landing')) {
        this.headerService.dispose();
        if (this.cordovaService.isIOSApp) {
          this.zone.run(async () => await this.router.navigate(['/ios-landing']));
        } else {
          this.zone.run(async () => await this.router.navigate(['/login']));
        }
      }
    } else if (error.headers) {
      if (!error.ok && error.status !== 401) {
        this.originalAlert(error.statusText);
      }
    } else {
      const message = error.message ? error.message : error.toString();
      console.error(message, error.stack);
      if (message !== 'Error parsing handshake response: Error: Expected a handshake response from the server.') {
        if (!error.handled) { this.originalAlert(message); }
      }
    }
  }
}
