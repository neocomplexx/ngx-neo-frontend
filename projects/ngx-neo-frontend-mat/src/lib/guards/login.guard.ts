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
  constructor(protected headerService: HeaderNeoComplexxService, protected router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.headerService.IsLogged()) {
        return false;
    } else {
      return true;
    }
  }
}
