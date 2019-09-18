import { AuthActions, AuthActionTypes } from 'app/auth/store/actions';
import { IUser } from '@control/core';

export interface AuthState {
    user: IUser | {};
    loading: boolean;
    error: string | null;
}

export const inititalState: AuthState = {
    user: {},
    loading: false,
    error: ''
};

export function authReducer(state: AuthState = inititalState, action: AuthActions): AuthState 
{
    switch (action.type) 
    {
        case AuthActionTypes.Login: 
        {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }

        case AuthActionTypes.Logout:
        {
            return {
                ...state,
                loading: false,
                error: ''
            };
        }

        case AuthActionTypes.LoginSuccess:
        {
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: ''
            };
        }

        case AuthActionTypes.LoginFault: 
        {
            return {
                ...state,
                user: {},
                loading: false,
                error: action.payload
            };
        }

        case AuthActionTypes.ResetAuthError: 
        {
            return {
                ...state,
                error: ''
            };
        }

        default:
            return state;
    }
}
