import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ControlSharedModule } from '@control/shared.module';

import { SampleComponent } from './sample.component';
import { AuthGuard } from 'app/main/auth/login/guards/auth.guard';

const routes: Routes = [
    {
        path     : 'sample',
        component: SampleComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        ControlSharedModule
    ],
    exports     : [
        SampleComponent
    ]
})

export class SampleModule
{
}
