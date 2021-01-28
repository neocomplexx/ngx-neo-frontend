import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { HeaderNeoComplexxService } from '../services/header-neo-complexx.service';
import { CordovaService } from '../services/cordova';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(protected headerService: HeaderNeoComplexxService, protected router: Router, protected cordovaService: CordovaService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot, ) {
    if (this.headerService.IsLogged()) {
      return true;
    } else {
      if (this.cordovaService.isIOSApp) {
        return this.router.parseUrl('/ios-landing');
      } else {
        return this.router.parseUrl('/login');
      }
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.headerService.IsLogged()) {
      return true;
    } else {
      if (this.cordovaService.isIOSApp) {
        return this.router.parseUrl('/ios-landing');
      } else {
        return this.router.parseUrl('/login');
      }
    }
  }
}
