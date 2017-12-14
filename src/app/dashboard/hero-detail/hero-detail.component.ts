import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'hero-detail',
    templateUrl: 'hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
    hero: Hero;

    // ActivatedRoute contains id as parameter
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public heroService: HeroService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(p => {
            let hero = this.heroService.getHero(+(p.has('id') && p.get('id')));
            if (hero !== null) {
                this.hero = hero;
            } else {
                this.gotoList();
            }
        });
    }

    gotoList() {
        this.router.navigateByUrl('/heroes');
    }

    cancel() {
        this.gotoList();
    }
}