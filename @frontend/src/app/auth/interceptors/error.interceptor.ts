import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import * as fromStore from 'app/auth/store';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private store: Store<any>) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                 // cierre de sesión automático si la respuesta 401 no autorizada o 403 prohibida regresó de la API
                this.store.dispatch( new fromStore.Logout() );
                // location.reload();
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
