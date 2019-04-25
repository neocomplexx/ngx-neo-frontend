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
    if (this.headerService.userType) {
      if (next.data.expectedType) {
        if (this.headerService.userType === next.data.expectedType) {
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
    if (this.headerService.userType) {
      if (next.parent.data.expectedType) {
        if (this.headerService.userType === next.parent.data.expectedType) {
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
