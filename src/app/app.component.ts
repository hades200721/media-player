import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp(
      {
        apiKey: "AIzaSyCJLvcjV9nGj2-9i4t93SIiYYi8UNEuWPM",
        authDomain: "music-player-55870.firebaseapp.com"
      }
    );
  }
}
