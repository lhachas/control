import { NgModule } from '@angular/core';

import { ControlWidgetComponent } from './widget.component';
import { ControlWidgetToggleDirective } from './widget-toggle.directive';

@NgModule({
    declarations: [
        ControlWidgetComponent,
        ControlWidgetToggleDirective
    ],
    exports     : [
        ControlWidgetComponent,
        ControlWidgetToggleDirective
    ],
})
export class ControlWidgetModule
{
}
