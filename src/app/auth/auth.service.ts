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
                        if (remember) {
                            this.localStorageService.setObject('token', token);
                        }
                        this.token = token; 
                    }
                )
            }
            )
            .catch(
            error => console.log(error)
            )

        // var ref = new Firebase('https://music-player-55870.firebaseio.com');
        // ref.authWithPassword({
        //     email: 'gleb@test.com',
        //     password: '123456'
        // }, function (error, authData) {
        //     /* Your Code */
        // }, {
        //         remember: 'sessionOnly'
        //     });
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
            (token: string) => this.token = token
            );
        return this.token;
    }

    logOut() {
        firebase.auth().signOut();
        this.token = null;
    }

    isAuthenticated() {
        return this.token != null;
    }
}