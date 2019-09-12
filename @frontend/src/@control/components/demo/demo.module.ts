import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { ControlDemoContentComponent } from './demo-content/demo-content.component';
import { ControlDemoSidebarComponent } from './demo-sidebar/demo-sidebar.component';

@NgModule({
    declarations: [
        ControlDemoContentComponent,
        ControlDemoSidebarComponent
    ],
    imports     : [
        RouterModule,

        MatDividerModule,
        MatListModule
    ],
    exports     : [
        ControlDemoContentComponent,
        ControlDemoSidebarComponent
    ]
})
export class ControlDemoModule
{
}
