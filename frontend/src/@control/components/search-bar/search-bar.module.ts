import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ControlSearchBarComponent } from './search-bar.component';

@NgModule({
    declarations: [
        ControlSearchBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        ControlSearchBarComponent
    ]
})
export class ControlSearchBarModule
{
}
