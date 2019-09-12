import { NgModule } from '@angular/core';

import { ControlSidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        ControlSidebarComponent
    ],
    exports     : [
        ControlSidebarComponent
    ]
})
export class ControlSidebarModule
{
}
