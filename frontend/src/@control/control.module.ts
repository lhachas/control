import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { CONTROL_CONFIG } from '@control/services/config.service';

@NgModule()
export class ControlModule
{
    constructor(@Optional() @SkipSelf() parentModule: ControlModule)
    {
        if ( parentModule )
        {
            throw new Error('ControlModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : ControlModule,
            providers: [
                {
                    provide : CONTROL_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
