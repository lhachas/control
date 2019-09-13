import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ControlSharedModule } from '@control/shared.module';
import { ControlSnackBar } from '@control/components/snackbar/snackbar.module';
import { AuthGuard } from 'app/main/auth/login/guards/auth.guard';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { LoginComponent } from 'app/main/auth/login/login.component';

const routes: Routes = [
    {
        path     : 'login',
        component: LoginComponent,
        // canActivate: [AuthGuard]
    },
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        ControlSharedModule,
        ControlSnackBar
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ]
})
export class LoginModule
{
}
