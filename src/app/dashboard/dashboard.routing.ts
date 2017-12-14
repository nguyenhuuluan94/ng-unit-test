import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {DashboardHeroComponent} from './dashboard-hero/dashboard-hero.component';
export const ROUTES: Routes = [
    {
        path: '', children: [
            { path: '', component: DashboardComponent },
            { path: 'heroes/:id', component: HeroDetailComponent }
        ]
    }
];
