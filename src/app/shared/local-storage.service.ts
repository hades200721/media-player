import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

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
    }
}