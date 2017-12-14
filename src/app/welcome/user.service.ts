import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
    user = {
        name: 'Hung',
        age: '28'
    };
    isLoggedIn = false;

    constructor() {
    }
}
