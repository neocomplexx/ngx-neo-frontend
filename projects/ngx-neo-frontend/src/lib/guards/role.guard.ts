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
export class RoleGuard implements CanActivate {
  constructor(private headerService: HeaderNeoComplexxService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.headerService.userRole) {
      if (next.data.expectedRole) {
        if (this.headerService.userRole === next.data.expectedRole) {
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
    if (this.headerService.userRole) {
      if (next.parent.data.expectedRole) {
        if (this.headerService.userRole === next.parent.data.expectedRole) {
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
