import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ControlDirectivesModule } from '@control/directives/directives';
import { ControlPipesModule } from '@control/pipes/pipes.module';

@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        ControlDirectivesModule,
        ControlPipesModule
    ],
    exports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        ControlDirectivesModule,
        ControlPipesModule
    ]
})
export class ControlSharedModule
{
}
