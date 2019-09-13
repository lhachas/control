import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '@control/components/snackbar/snackbar.component';
import { ControlSnackBarConfig } from '@control/components/snackbar/snackbar.config';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(private snackBar: MatSnackBar) { }

    public open(snackBarConfig?: ControlSnackBarConfig): void {
        const _snackType = snackBarConfig.type !== undefined ? snackBarConfig.type : 'success';

        this.snackBar.openFromComponent(SnackbarComponent, {
            duration: snackBarConfig.duration || 8000,
            horizontalPosition: snackBarConfig.horizontalPosition || 'center',
            verticalPosition: snackBarConfig.verticalPosition || 'top',
            panelClass: snackBarConfig.panelClass || `notif-${_snackType}`,
            data: { message: snackBarConfig.message, snackType: _snackType }
        });
    }
}
