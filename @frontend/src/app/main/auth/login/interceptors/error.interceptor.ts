import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'app/main/auth/login/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private _authService: AuthService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            console.log(err);
            if ([401, 403].indexOf(err.status) !== -1) {
                 // cierre de sesión automático si la respuesta 401 no autorizada o 403 prohibida regresó de la API
                this._authService.logout();
                location.reload();
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
