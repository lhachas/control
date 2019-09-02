import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { TranslateModule } from '@ngx-translate/core';

import { ControlNavigationComponent } from './navigation.component';
import { ControlNavVerticalItemComponent } from './vertical/item/item.component';
import { ControlNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { ControlNavVerticalGroupComponent } from './vertical/group/group.component';
import { ControlNavHorizontalItemComponent } from './horizontal/item/item.component';
import { ControlNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,

        TranslateModule.forChild()
    ],
    exports     : [
        ControlNavigationComponent
    ],
    declarations: [
        ControlNavigationComponent,
        ControlNavVerticalGroupComponent,
        ControlNavVerticalItemComponent,
        ControlNavVerticalCollapsableComponent,
        ControlNavHorizontalItemComponent,
        ControlNavHorizontalCollapsableComponent
    ]
})
export class ControlNavigationModule
{
}
