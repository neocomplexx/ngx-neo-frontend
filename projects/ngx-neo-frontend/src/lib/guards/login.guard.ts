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
export class LoginGuard implements CanActivate {
  constructor(private headerService: HeaderNeoComplexxService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.headerService.IsLogged()) {
      const redirect = next.data ? next.data.redirect : false;
      if (redirect) {
        return this.router.parseUrl('/home');
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
