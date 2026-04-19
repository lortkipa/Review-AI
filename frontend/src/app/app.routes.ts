import { Routes } from '@angular/router';
import { Chat } from './components/chat/chat';
import { appName } from './globals';
import { Auth } from './components/auth/auth';
import { GoogleCallback } from './components/auth/google-callback/google-callback';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full'
    },
    {
        path: 'chat',
        component: Chat,
        title: appName
    },
    {
        path: 'auth',
        component: Auth,
        title: appName
    },
    {
        path: 'google-callback',
        component: GoogleCallback,
        title: 'Google Authentication'
    }
];
