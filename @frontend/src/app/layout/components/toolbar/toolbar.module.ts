import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ControlSearchBarModule, ControlShortcutsModule } from '@control/components';
import { ControlSharedModule } from '@control/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import { AuthModule } from 'app/auth/auth.module';

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,

        ControlSharedModule,
        ControlSearchBarModule,
        ControlShortcutsModule,
        
        AuthModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
