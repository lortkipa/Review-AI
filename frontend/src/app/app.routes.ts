import { Routes } from '@angular/router';
import { Chat } from './components/chat/chat';
import { appName } from './globals';

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
];
