import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

    ngOnInit(): void {}

    get getIcon(): string {
        switch (this.data.snackType) {
            case 'success':
                return 'check_circle';
            case 'error':
                return 'cancel';
            case 'warning':
                return 'warning';
            case 'info':
                return 'info';
        }
    }
}
