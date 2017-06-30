import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable()
export class AuthService {

    token: string;

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) {
        this.token = localStorageService.getObject('token');
    }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
            error => console.log(error)
            )
    }

    signinUser(email: string, password: string, remember: boolean = false) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
            response => {
                this.router.navigate(['/'])
                firebase.auth().currentUser.getIdToken().then(
                    (token: string) => {
                        this.localStorageService.setObject('token', token);
                        this.token = token;
                    }
                )
            }
            )
            .catch(
            error => console.log(error)
            )
    }

    getToken() {
        if (firebase.auth().currentUser) {
            firebase.auth().currentUser.getIdToken()
                .then(
                (token: string) => {
                    this.token = token;
                    this.localStorageService.setObject('token', token);
                }
                );
        }
        return this.token;
    }

    logOut() {
        firebase.auth().signOut();
        this.localStorageService.removeObject('token');
        this.token = null;
    }

    isAuthenticated() {
        return this.token != null;
    }
}