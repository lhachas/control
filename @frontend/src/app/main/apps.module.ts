import { NgModule } from '@angular/core';

import { ControlSharedModule } from '@control/shared.module';
import { ContactsModule } from 'app/main/contacts/contacts.module';

@NgModule({
    imports: [
        ControlSharedModule,
        ContactsModule
    ]
})
export class AppsModule 
{
}
