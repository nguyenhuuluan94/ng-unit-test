import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
    welcome = '-- not initialized yet --';

    constructor(public userService: UserService) {
    }

    ngOnInit() {
        this.welcome = this.userService.isLoggedIn
            ? 'Welcome ' + this.userService.user.name
            : 'Please log in.';
    }

}
