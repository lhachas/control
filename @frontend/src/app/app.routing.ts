import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path        : 'contacts',
        loadChildren: './main/contacts/contacts.module#ContactsModule',
    },
    {
        path: 'auth',
        loadChildren: './main/auth/auth.module#AuthModule'
    },
    {
        path      : '**',
        redirectTo: '',
    }
];
