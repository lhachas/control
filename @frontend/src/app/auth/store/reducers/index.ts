import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from 'app/auth/store/reducers/auth.reducer';

export interface AuthAppState
{
    auth: fromAuth.AuthState;
}

export const getAuthState = createFeatureSelector<AuthAppState>(
    'auth'
);

export const getAppState = createSelector(
    getAuthState,
    (state: AuthAppState) => state
);

export const reducers: ActionReducerMap<AuthAppState> = {
    auth: fromAuth.authReducer
};

export * from './auth.reducer';
