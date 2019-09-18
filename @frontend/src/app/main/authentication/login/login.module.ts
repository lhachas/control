import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ControlSharedModule } from '@control/shared.module';
import { ControlSnackBarModule } from '@control/components/snackbar/snackbar.module';

import { AuthModule } from 'app/auth/auth.module';
import { LoginComponent } from 'app/main/authentication/login/login.component';

const routes: Routes = [
    {
        path     : 'login',
        component: LoginComponent,
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
        MatProgressBarModule,

        ControlSharedModule,
        ControlSnackBarModule,
        AuthModule
    ]
})
export class LoginModule
{
}
