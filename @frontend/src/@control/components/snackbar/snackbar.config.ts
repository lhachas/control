import { MatSnackBarConfig } from '@angular/material';

export class ControlSnackBarConfig extends MatSnackBarConfig {
    message: string;
    public type: 'success'|'info'|'warning'|'error';
}
