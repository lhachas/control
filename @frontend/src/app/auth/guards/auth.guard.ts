import { Injectable } from '@angular/core';
import { 
    Router, 
    UrlTree, 
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot 
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import * as fromStore from 'app/auth/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private store: Store<any>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree|Observable<boolean|UrlTree> | Promise<boolean|UrlTree> {
        return this.checkStoreAuthentication()
            .pipe(
                map((authenticated) => {
                    if (!authenticated) {
                        this.store.dispatch(new fromStore.NavigateToLogin());
                        console.log(`canActivate( No. Redirige al usuario nuevamente para iniciar sesión. )`);
                        return false;
                    }

                    console.log(`canActivate( Si. Navega al usuario a la ruta solicitada. )`);
                    return true;
                }),
                first()
            );
        
        // const currentUser = this._authService.currentUserValue;

        // if (currentUser) {
        //     // check if router is restricted by role
        //     if (route.data.roles && route.data.roles.indexOf(currentUser.staff.role.rolename) === -1) {
        //         // role not authorised so redirect to home page
        //         this._router.navigate(['/sample']);
        //         return false;
        //     }

        //     // authorised so return true
        //     return true;
        // }

        // // no ha iniciado sesión, así que redirija a la página de inicio de sesión con la URL de retorno
        // this._router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        // return false;
    }

    /**
     * Determine si el usuario ha iniciado sesión comprobando la tienda Redux.
     */
    private checkStoreAuthentication(): Observable<boolean> {
        return this.store
            .pipe(select(fromStore.getIsLoggedIn))
            .pipe(first());
    }

}
