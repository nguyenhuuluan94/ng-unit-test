import { HeroService } from './hero.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Hero} from './hero';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    heroes: Hero[];

    constructor(
        public router: Router,
        public heroService: HeroService
    
    ) {
    }

    ngOnInit() {
        this.heroes = this.heroService.heroes;
        console.log(this.heroes);
    }

    goToDetail(hero: Hero) {
        const url = `/heroes/${hero.id}`;
        this.router.navigateByUrl(url);
    }
}
