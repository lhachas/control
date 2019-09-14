import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatProgressBar } from '@angular/material/progress-bar';

import { ControlConfigService } from '@control/services/config.service';
import { SnackBarService } from '@control/components/snackbar/snackbar.service';
import { controlAnimations } from '@control/animations';

import { AuthService } from 'app/main/auth/login/auth.service';
import { first } from 'rxjs/operators';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : controlAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup; 
    loading = false;
    submitted = false;
    returnUrl: string;
    error: '';
    spinnerButtonOptions: MatProgressButtonOptions;

    /**
     * Constructor
     *
     * @param {ControlConfigService} _controlConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _controlConfigService: ControlConfigService,
        private _formBuilder: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _authService: AuthService,
        private _snackBar: SnackBarService,
    )
    {
        // redirect to home if already logged in
        if (this._authService.currentUserValue) {
            this._router.navigate(['/sample']);
        }

        // Configure the layout
        this._controlConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    
    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.spinnerButtonOptions = {
            active: false,
            icon: 'error',
            text: 'INICIAR SESION',
            spinnerSize: 18,
            raised: true,
            stroked: false,
            buttonColor: 'accent',
            spinnerColor: 'primary',
            fullWidth: true,
            disabled: false,
            mode: 'indeterminate',
        };
        

        // obtener la URL de retorno de los parámetros de ruta o por defecto '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/sample';

    }

    // convenience getter for easy access to from fields
    get f(): any { 
        return this.loginForm.controls; 
    }

    onSubmit(): void {
        this.submitted = true;

        // stop here if from is invalid
        if (this.loginForm.invalid) {
            return; 
        }
        this.spinnerButtonOptions.active = true;
        this.loading = true;
        this._authService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(data => {
                this._snackBar.open({
                    message: 'Iniciaste sesion correctamente.',
                    type: 'success'
                });
                this._router.navigate([this.returnUrl]);
            }, error => {
                this._snackBar.open({
                    message: error.toString() || error.error.message.toString(),
                    type: 'error',
                    duration: 7000,
                });
                this.error = error;
                this.loading = false;
                this.spinnerButtonOptions.active = false;
            });
    }
}
