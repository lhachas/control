import { createSelector } from '@ngrx/store';
import { getAuthState, AuthAppState, AuthState } from 'app/auth/store/reducers';

export const getState = createSelector(
    getAuthState,
    (state: AuthAppState) => state.auth
);

export const getUser = createSelector(
    getState,
    (state: AuthState) => state.user
);

export const getIsLoggedIn = createSelector(
    getState,
    (state: AuthState) => !!state.user
);

export const getError = createSelector(
    getState,
    (state: AuthState) => state.error
);

export const getPending = createSelector(
    getState,
    (state: AuthState) => state.loading
);
