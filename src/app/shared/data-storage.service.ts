import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

import { PlaylistService } from '../playlist/playlist.service';
import { AuthService } from '../auth/auth.service';
import { Song } from '../media-player/result-list/result-item/result-item.model';

const DATABASENAME = 'playlist';
const SERVERNAME = 'https://music-player-55870.firebaseio.com/';

@Injectable()
export class DataStorageService {

    constructor(
        private http: Http,
        private authService: AuthService,
        private playlistService: PlaylistService
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

    savePlaylist() {
        const token = this.authService.getToken();
        const url = SERVERNAME + DATABASENAME + '.json?auth=' + token;

        const playlist = this.playlistService.getRecipes();
        return this.http.put(url, playlist)
            .subscribe(
            (response: Response) => {
                console.info(response);
            }
            )
    }
}