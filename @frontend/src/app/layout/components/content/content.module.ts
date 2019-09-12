import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlSharedModule } from '@control/shared.module';

import { ContentComponent } from 'app/layout/components/content/content.component';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports     : [
        RouterModule,
        ControlSharedModule
    ],
    exports     : [
        ContentComponent
    ]
})
export class ContentModule
{
}
