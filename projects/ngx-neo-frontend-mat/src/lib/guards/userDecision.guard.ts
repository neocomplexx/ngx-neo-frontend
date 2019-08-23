import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import { HeaderNeoComplexxService } from '../services/header-neo-complexx.service';

@Injectable({
  providedIn: 'root'
})
export class UserDecisionGuard implements CanActivate {
  constructor(private headerService: HeaderNeoComplexxService, private router: Router) { }

  canActivate() {
    if (this.headerService.userType === 'administrator') {
      return this.router.parseUrl('/admin');
    } else {
      return this.router.parseUrl('/user');
    }
  }

  canActivateChild() {
    if (this.headerService.userType === 'administrator') {
      return this.router.parseUrl('/admin');
    } else {
      return this.router.parseUrl('/user');
    }
  }

}
