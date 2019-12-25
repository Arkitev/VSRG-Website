import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (window.localStorage.getItem('jwt')) {
            return true;
        }

        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
