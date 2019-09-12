import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ControlConfirmDialogComponent } from '@control/components/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        ControlConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [
        ControlConfirmDialogComponent
    ],
})
export class ControlConfirmDialogModule
{
}
