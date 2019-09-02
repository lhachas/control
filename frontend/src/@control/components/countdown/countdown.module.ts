import { NgModule } from '@angular/core';

import { ControlCountdownComponent } from '@control/components/countdown/countdown.component';

@NgModule({
    declarations: [
        ControlCountdownComponent
    ],
    exports: [
        ControlCountdownComponent
    ],
})
export class ControlCountdownModule
{
}
