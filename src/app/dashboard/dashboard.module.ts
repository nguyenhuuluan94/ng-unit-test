import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './hero.service';
import {NgModule} from '@angular/core';

import {DashboardComponent} from './dashboard.component';
import {DashboardHeroComponent} from './dashboard-hero/dashboard-hero.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ROUTES} from './dashboard.routing';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(ROUTES), FormsModule],
    exports: [DashboardComponent],
    declarations: [DashboardComponent, DashboardHeroComponent, HeroDetailComponent],
    providers: [HeroService]
})
export class DashboardModule {
}
