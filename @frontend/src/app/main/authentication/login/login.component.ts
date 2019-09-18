import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MatProgressBar } from '@angular/material/progress-bar';

import { ControlConfigService } from '@control/services/config.service';
import { SnackBarService } from '@control/components/snackbar/snackbar.service';
import { controlAnimations } from '@control/animations';

import { AuthService } from 'app/auth/services/auth.service';
import { first, retry, catchError } from 'rxjs/operators';
import { IUser } from '@control/core';

import * as fromAuthStore from 'app/auth/store';
import { Observable } from 'rxjs';

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

    /**
     * @description
     * El posible error de inicio de sesión.
     * 
     */
    public error$: Observable<string>;

    /**
     * @description
     * Indicador que indica si el inicio de sesión está pendiente.
     * 
     */
    public pending$: Observable<boolean>;
    

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
        private _store: Store<fromAuthStore.AuthAppState>,
        private _snackBar: SnackBarService,
    )
    {
        // redirect to home if already logged in
        // if (this._authService.currentUserValue) {
        //     this._router.navigate(['/sample']);
        // }

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

        this.error$ = this._store.pipe(select(fromAuthStore.getError));
        this.pending$ = this._store.pipe(select(fromAuthStore.getPending));
  
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
        this.loading = true;
        this._store.dispatch(new fromAuthStore.Login({ 
            email: this.f.email.value, 
            password: this.f.password.value 
        }));
        // this._authService.login(this.f.email.value, this.f.password.value)
        //     .pipe(first())
        //     .subscribe((user: IUser) => {
        //         this._snackBar.open({
        //             message: 'Iniciaste sesion correctamente.',
        //             type: 'success'
        //         });
        //         this._router.navigate([this.returnUrl]);
        //         this._controlConfigService.config = JSON.parse(this._authService.currentUserValue.settings);
        //     }, error => {
        //         this._snackBar.open({
        //             message: error.toString() || error.error.message.toString(),
        //             type: 'error',
        //             duration: 7000,
        //         });
        //         this.error = error;
        //         this.loading = false;
        //     });
    }
}
