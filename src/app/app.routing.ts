import { WelcomeComponent } from './welcome/welcome.component';
import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TwainComponent} from './shared/twain.component';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'heroes',
        pathMatch: 'full'
    },
    {
        path: 'heroes',
        component: DashboardComponent
    },
    {
        path: 'quote',
        component: TwainComponent
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    }
];


