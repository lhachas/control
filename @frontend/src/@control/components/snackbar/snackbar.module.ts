import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material';

import { SnackbarComponent } from '@control/components/snackbar/snackbar.component';
import { SnackBarService } from '@control/components/snackbar/snackbar.service';

@NgModule({
    declarations: [
        SnackbarComponent
    ],
    entryComponents: [
        SnackbarComponent
    ],
    imports     : [
        MatIconModule,
        MatSnackBarModule
    ], 
    exports     : [
        SnackbarComponent
    ],
    providers: [
        SnackBarService
    ],
})
export class ControlSnackBarModule
{
}
