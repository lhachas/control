import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum types {
    go = '[Router] Go',
    back = '[Router] Back',
    forward = '[Router] Forward'
}

export class Go implements Action 
{
    readonly type = types.go;

    /**
     * Constructor
     *
     * @param {{path: any[]; query?: object; extras?: NavigationExtras}} payload
     */
    constructor(
        public payload: {
            path: any[],
            query?: object;
            extras?: NavigationExtras;
        }
    )
    {
    }
}

export class Back implements Action
{
    readonly type = types.back;
}

export class Forward implements Action
{
    readonly type = types.forward;
}

export type Actions = Go | Back | Forward;
