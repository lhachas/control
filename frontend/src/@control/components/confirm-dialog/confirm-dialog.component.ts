import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector   : 'control-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class ControlConfirmDialogComponent
{
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ControlConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<ControlConfirmDialogComponent>
    )
    {
    }

}
