import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { effects } from 'app/auth/store/effects';
import { reducers } from 'app/auth/store/reducers';
import { ErrorInterceptor } from 'app/auth/interceptors/error.interceptor';
import { JwtInterceptor } from 'app/auth/interceptors/jwt.interceptor';
import { ControlSnackBarModule } from '@control/components/snackbar/snackbar.module';


@NgModule({
    imports     : [
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature(effects),
        ControlSnackBarModule
    ],
    providers   : [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: ErrorInterceptor,
        //     multi: true
        // }
    ]
})
export class AuthModule
{
}
