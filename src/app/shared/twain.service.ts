import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class TwainService {

    constructor(public http: Http) {
    }

    getQuote(): Promise<string> {
        return this.http.get('assets/data.json').toPromise().then(data => data.json().data);
    }
}
