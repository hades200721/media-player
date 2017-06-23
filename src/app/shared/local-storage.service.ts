import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocalStorageService {

    localStorageChange: Subject<string> = new Subject<string>();
    // get local storage value of the key
    getObject(key) {
        try {
            return JSON.parse(localStorage[key]);
        }
        catch (e) {
            console.log(e.message);
        }

    }

    // setting key with the value to local storage throught local storage api
    setObject(key, value) {
        localStorage[key] = JSON.stringify(value);
        this.localStorageChange.next(key);
    }
}