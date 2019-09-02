import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ControlSharedModule } from '@control/shared.module';

import { ContactsModule } from 'app/main/contacts/contacts.module';

const routes = [
    {
        path         : 'contacts',
        loadChildren : './contacts/contacts.module#ContactsModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ControlSharedModule,
    ]
})
export class AppsModule 
{
}
