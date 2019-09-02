import { NgModule } from '@angular/core';

import { ControlSharedModule } from '@control/shared.module';

import { NavbarComponent } from 'app/layout/components/navbar/navbar.component';
import { NavbarHorizontalStyle1Module } from 'app/layout/components/navbar/horizontal/style-1/style-1.module';
import { NavbarVerticalStyle1Module } from 'app/layout/components/navbar/vertical/style-1/style-1.module';
import { NavbarVerticalStyle2Module } from 'app/layout/components/navbar/vertical/style-2/style-2.module';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports     : [
        ControlSharedModule,

        NavbarHorizontalStyle1Module,
        NavbarVerticalStyle1Module,
        NavbarVerticalStyle2Module
    ],
    exports     : [
        NavbarComponent
    ]
})
export class NavbarModule
{
}
