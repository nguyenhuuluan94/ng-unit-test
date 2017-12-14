import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-button-comp',
    template: `
        <button (click)="clicked()">Click me!</button>
        <span>{{ message }}</span>
    `
})
export class ButtonComponent implements OnInit {
    isOn = false;

    constructor() { }

    ngOnInit() { 

    }

    clicked() {
        this.isOn = !this.isOn;
    }

    get message() {
        return `The light is ${ this.isOn ? 'On' : 'Off' }`;
    }

}