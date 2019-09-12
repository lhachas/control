import { NgModule } from '@angular/core';

import { ControlIfOnDomDirective } from '@control/directives/control-if-on-dom/control-if-on-dom.directive';
import { ControlInnerScrollDirective } from '@control/directives/control-inner-scroll/control-inner-scroll.directive';
import { ControlPerfectScrollbarDirective } from '@control/directives/control-perfect-scrollbar/control-perfect-scrollbar.directive';
import { ControlMatSidenavHelperDirective, ControlMatSidenavTogglerDirective } from '@control/directives/control-mat-sidenav/control-mat-sidenav.directive';

@NgModule({
    declarations: [
        ControlIfOnDomDirective,
        ControlInnerScrollDirective,
        ControlMatSidenavHelperDirective,
        ControlMatSidenavTogglerDirective,
        ControlPerfectScrollbarDirective
    ],
    imports     : [],
    exports     : [
        ControlIfOnDomDirective,
        ControlInnerScrollDirective,
        ControlMatSidenavHelperDirective,
        ControlMatSidenavTogglerDirective,
        ControlPerfectScrollbarDirective
    ]
})
export class ControlDirectivesModule
{
}
