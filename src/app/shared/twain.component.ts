import {Component, OnInit} from '@angular/core';
import {TwainService} from './twain.service';

@Component({
    moduleId: module.id,
    selector: 'app-twain-quote',
    template: '<p class="twain"><i>{{quote}}</i></p>',
    providers: [TwainService]
})

export class TwainComponent implements OnInit {
    intervalId: number;
    quote = '...';

    constructor(public twainService: TwainService) {}

    ngOnInit() {
        this.twainService.getQuote().then(quote => this.quote = quote);
    }
}
