import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';

import { ApiEndpointService } from 'app/auth/services/api-endpoint.service';
import * as fromStore from 'app/auth/store';
import { IUser } from '@control/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private store: Store<any>) { }

    /**
     * @description
     * Intercepta todas las solicitudes HTTP y agrega el token JWT al encabezado de la solicitud si la URL
     * es un punto final REST y no inicia o cierra sesión.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiEndPoint: boolean = ApiEndpointService.isApiEndpoint(request.url);
        const isAuthEndPoint: boolean = ApiEndpointService.isAuthEndpoint(request.url);

        // NOTA: Agregue solo el token de autenticación a puntos finales REST que no sean de autenticación.
        // agregar encabezado de autorización con JWT si está disponible

        if (isApiEndPoint && !isAuthEndPoint) {
            return this.addToken(request).pipe(
                first(),
                mergeMap((requestWithToken: HttpRequest<any>) => next.handle(requestWithToken))
            );
        } else {
            return next.handle(request);
        }
        // const currentUser = this._authService.currentUserValue;
        // if (currentUser && currentUser.token) {
        //     req = req.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${currentUser.token}`
        //         }
        //     });
        // }
        // return next.handle(req);
    }

    /**
     * @description
     * Agrega el token JWT al encabezado de la solicitud.
     */
    private addToken(request: HttpRequest<any>): Observable<HttpRequest<any>> {
        // NOTA: NO intente configurar inmediatamente este selector en el constructor o como una asignación en un
        // variable de miembro de clase, ya que no hay tiendas disponibles cuando este interceptor se activa por primera vez y
        // como resultado arrojará un error de tiempo de ejecución.
        return this.store.pipe(
            select(fromStore.getUser),
            first(),
            mergeMap((user: IUser) => {
                if (user && user.token) {
                    request = request.clone({
                        headers: request.headers.set('Authorization', `Bearer ${user.token}`),
                        withCredentials: true
                    });
                } else {
                    console.warn(`addToken( ¡¡¡token invalido!!! No se puede usar el token "${user.token}" para el endpoint: ${request.url} ).`);
                }
                return of(request);
            })
        );
    }
}
