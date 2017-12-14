import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html'
})

export class BannerComponent implements OnInit {
    title = 'Test Tour of Heroes';

    constructor() {
    }

    ngOnInit() {
    }
}
