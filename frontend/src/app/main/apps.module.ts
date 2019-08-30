import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

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
        FuseSharedModule,
    ]
})
export class AppsModule 
{
}
