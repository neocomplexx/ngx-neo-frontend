import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { HeaderNeoComplexxService } from '../services/header-neo-complexx.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {
  constructor(private headerService: HeaderNeoComplexxService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.headerService.IsLogged()) {
      if (next.data.expectedType) {
        if (this.headerService.userLogged.userType === next.data.expectedType) {
          return true;
        } else {
          return this.router.parseUrl('/home');
        }
      } else if (next.data.expectedTypes) {
        if (next.data.expectedTypes.includes(this.headerService.userLogged.userType)) {
          return true;
        } else {
          return this.router.parseUrl('/home');
        }
      } else {
        return true;
      }
    } else {
      this.headerService.dispose();
      return this.router.parseUrl('/login');
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.headerService.IsLogged()) {
      if (next.data.expectedType) {
        if (this.headerService.userLogged.userType === next.data.expectedType) {
          return true;
        } else {
          return this.router.parseUrl('/home');
        }
      } else if (next.data.expectedTypes) {
        if (next.data.expectedTypes.includes(this.headerService.userLogged.userType)) {
          return true;
        } else {
          return this.router.parseUrl('/home');
        }
      } else {
        return true;
      }
    } else {
      this.headerService.dispose();
      return this.router.parseUrl('/login');
    }
  }
}
