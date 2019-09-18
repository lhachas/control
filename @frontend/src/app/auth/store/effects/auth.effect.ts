import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { AuthDto, IUser } from '@control/core';

import { State, getRouterState } from 'app/store/reducers';
import { AuthService } from 'app/auth/services/auth.service';
import { AuthActionTypes } from 'app/auth/store/actions';
import * as RouterActions from 'app/store/actions';
import * as AuthActions from 'app/auth/store/actions/auth.action';

import { SnackBarService } from '@control/components/snackbar/snackbar.service';

@Injectable()
export class AuthEffect
{
    routerState: any;

    constructor(private _actions: Actions,
                private _store: Store<State>,
                private _authService: AuthService,
                private _progressBar: SnackBarService)
    {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState)
                {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * @description
     * Iniciar sesion
     */
    @Effect()
    login$: Observable<Action> = this._actions.pipe(
        ofType<AuthActions.Login>(AuthActionTypes.Login),
        map((action: AuthActions.Login) => action.payload),
        exhaustMap((creds: AuthDto) => 
            this._authService.login(creds).pipe(
                mergeMap((data: IUser) => [
                    new AuthActions.LoginSucces(data),
                    new RouterActions.Go({ path: ['/sample'] })
                ]),
                catchError((err: HttpErrorResponse) => of(new AuthActions.LoginFault(err.error.message)))
            )
        )
    );

    /**
     * @description
     * Login iniciado correctamente
     */
    @Effect({ dispatch: false })
    loginSuccess$: Observable<AuthActions.LoginSucces> = this._actions.pipe(
        ofType<AuthActions.LoginSucces>(AuthActionTypes.LoginSuccess),
        tap(user => {
            this._progressBar.open({
                message: 'Iniciaste sesion correctamente.',
                type: 'success'
            });
            localStorage.setItem('controlUser', JSON.stringify(user.payload));
        })
    );

    /**
     * @description
     * Login incorrecto
     */
    @Effect({ dispatch: false })
    loginFault$: Observable<AuthActions.LoginFault> = this._actions.pipe(
        ofType<AuthActions.LoginFault>(AuthActionTypes.LoginFault),
        tap((error) => {
            this._progressBar.open({
                message: error.payload,
                type: 'error'
            });
        })
    );

    /**
     * @description
     * Enruta al usuario al flujo de inicio de sesión.
     */
    @Effect()
    navigateToLogin$: Observable<Action> = this._actions.pipe(
        ofType<AuthActions.NavigateToLogin>(AuthActionTypes.NavigateToLogin),
        mergeMap((action) => {
            return [
                new AuthActions.ResetAuthError(),
                new RouterActions.Go({ path: ['auth/login'] })
            ];
        })
    );

    /**
     * @description
     * Cierrar sesión
     */
    @Effect()
    logout$: Observable<Action> = this._actions.pipe(
        ofType<AuthActions.Logout>(AuthActionTypes.Logout),
        mergeMap((action) => {
            return [
                new AuthActions.Logout(),
                new RouterActions.Go({ path: ['auth/login'] })
            ];
        })
    );
}
