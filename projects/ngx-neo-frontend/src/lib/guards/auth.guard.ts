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
export class AuthGuard implements CanActivate {
  constructor(private headerService: HeaderNeoComplexxService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.headerService.IsLogged()) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.headerService.IsLogged()) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
