import { Injectable } from '@angular/core';
import { Router, UrlTree, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'app/main/auth/login/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private _router: Router,
                private _authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree|Observable<boolean|UrlTree> | Promise<boolean|UrlTree> {
        const currentUser = this._authService.currentUserValue;

        if (currentUser) {
            // check if router is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUser.staff.role.rolename) === -1) {
                // role not authorised so redirect to home page
                this._router.navigate(['/']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}
