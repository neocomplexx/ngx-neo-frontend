import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(privatenext: ActivatedRouteSnapshot, privatestate: RouterStateSnapshot) {
        if (localStorage.getItem('currentUserWeb') !== null) {
            return true;
        } else {
            return this.router.parseUrl('/login');
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUserWeb') !== null) {
            return true;
        } else {
            return this.router.parseUrl('/login');
        }
    }
}
