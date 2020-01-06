import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import { HeaderNeoComplexxService } from '../services/header-neo-complexx.service';
import { UserTypes } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserDecisionGuard implements CanActivate {
  constructor(private headerService: HeaderNeoComplexxService, private router: Router) { }

  canActivate() {
    if (this.headerService.userLogged.userType === UserTypes.Administrator) {
      return this.router.parseUrl('/admin');
    } else {
      return this.router.parseUrl('/user');
    }
  }

  canActivateChild() {
    if (this.headerService.userLogged.userType === UserTypes.Administrator) {
      return this.router.parseUrl('/admin');
    } else {
      return this.router.parseUrl('/user');
    }
  }


}
