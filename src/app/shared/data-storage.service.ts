import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Song } from '../media-player/result-list/result-item/result-item.model';

const DATABASENAME = 'playlist';
const SERVERNAME = 'https://music-player-55870.firebaseio.com/';

@Injectable()
export class DataStorageService {

    constructor(
        private http: Http,
        private authService: AuthService
    ) { }

    getPlaylistSongs() {
        const token = this.authService.getToken();
        const url = SERVERNAME + DATABASENAME + '.json?auth=' + token;
        // 'https://music-player-55870.firebaseio.com/' + DATABASENAME + '.json?auth=' + token
        return this.http.get(url)
            .map(
            (respone: Response) => {
                return respone;
            });
    }

    savePlaylist(playlist: Song[]) {
        const token = this.authService.getToken();
        const url = SERVERNAME + DATABASENAME + '.json?auth=' + token;
        return this.http.put(url, playlist)
            .subscribe(
            (response: Response) => {
                console.info(response);
            }
            )
    }
}