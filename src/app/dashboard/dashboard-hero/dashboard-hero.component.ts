import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hero} from '../hero';

@Component({
    moduleId: module.id,
    selector: 'app-dashboard-hero',
    templateUrl: 'dashboard-hero.component.html'
})

export class DashboardHeroComponent implements OnInit {
    @Input() hero: Hero;
    @Output() selected = new EventEmitter<Hero>();

    constructor() {
    }

    ngOnInit() {
    }

    click() {
        this.selected.emit(this.hero);
    }
}

