import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, Subject } from 'rxjs';
import { map, retry, catchError, takeUntil } from 'rxjs/operators';

import { IUser, AuthDto } from '@control/core';
import { ControlConfigService } from '@control/services/config.service';

@Injectable({ providedIn: 'root' })
export class AuthService 
{
    private _unsubscribeAll: Subject<any>;
    private currentUserSubject: BehaviorSubject<IUser>;
    public currenUser: Observable<IUser>;

    constructor(private readonly _http: HttpClient,
                private readonly _controlConfigService: ControlConfigService) 
    {
        this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currenUser = this.currentUserSubject.asObservable();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        
        // Subscribe to the config changes
        this._controlConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                console.log(config);
            });
    }

    public get currentUserValue(): IUser 
    {
        return this.currentUserSubject.value;
    }

    public saveSetting(id: number, settings: any): Promise<IUser> 
    {
        return this._http.put<IUser>('api/v1/user/settings', { id, settings }).toPromise();
    }

    public login(credentials: AuthDto): Observable<any> 
    {
        const { email, password } = credentials;
        return this._http.post<any>('api/v1/auth/login', { email, password })
            .pipe(
                map((user: IUser) => {
                // console.log(user);
                return user;
                    // this._controlConfigService.config
                    //     .pipe(takeUntil(this._unsubscribeAll))
                    //     .subscribe(async (config) => {
                    //         if (user && user.token) {
                    //             if (!user.settings || user.settings === null) {
                    //                 const userDB = await this.saveSetting(user.id, JSON.stringify(config));
                    //                 if (userDB && userDB.token) {
                    //                     localStorage.setItem('currentUser', JSON.stringify(userDB));
                    //                 }
                    //             } else {
                    //                 localStorage.setItem('currentUser', JSON.stringify(user));
                    //             }
                    //             this.currentUserSubject.next(user);
                    //         }
                    //         return user;
                    //     });
                }),
                catchError((fault: HttpErrorResponse) => {
                    return throwError(fault);
                })
            );
    }

    public logout(): void 
    {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    private errorHandl(error): Observable<never> 
    {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
