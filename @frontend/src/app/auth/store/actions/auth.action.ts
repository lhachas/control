import { Action } from '@ngrx/store';
import { IUser, AuthDto } from '@control/core';

export enum AuthActionTypes 
{
    Login = '[Auth] Login',
    LoginSuccess = '[Auth] LoginSuccess',
    LoginFault = '[Auth] LoginFault',
    Logout = '[Auth] Logout',

    NavigateToLogin = '[Auth] NavigateToLogin',

    ResetAuthError = '[Auth] ResetAuthError'
}

export class Login implements Action 
{
    readonly type = AuthActionTypes.Login;

    constructor(public payload: AuthDto)
    {
    }
}

export class Logout implements Action
{
    readonly type = AuthActionTypes.Logout;
}

export class LoginSucces implements Action 
{
    readonly type = AuthActionTypes.LoginSuccess;

    constructor(public payload: IUser) 
    {
    }
}

export class LoginFault implements Action 
{
    readonly type = AuthActionTypes.LoginFault;

    constructor(public payload: string) 
    {
    }
}

export class NavigateToLogin implements Action
{
    readonly type = AuthActionTypes.NavigateToLogin;
}

export class ResetAuthError implements Action 
{
    readonly type = AuthActionTypes.ResetAuthError;
}

export type AuthActions = 
    | Login
    | Logout
    | LoginSucces
    | LoginFault
    | NavigateToLogin
    | ResetAuthError;
