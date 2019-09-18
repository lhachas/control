import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from 'environments/environment';
import { reducers, effects, CustomSerializer } from 'app/store';

export const metaReducers: MetaReducer<any>[] = !environment.production
    ? [storeFreeze]
    : [];

@NgModule({
    imports     : [
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot(effects),
        // !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: !environment.production
        }),
        StoreRouterConnectingModule.forRoot()
    ],
    providers   : [
        {
            provide : RouterStateSerializer,
            useClass: CustomSerializer
        }
    ]
})
export class AppStoreModule
{
}
