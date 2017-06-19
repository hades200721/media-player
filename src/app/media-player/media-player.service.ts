import { Injectable } from '@angular/core';
import { Song } from './result-list/result-item/result-item.model';
import { Subject } from 'rxjs/Subject'; 

@Injectable()
export class MediaPlayerService {

    songsChanged = new Subject<Song[]>();
    private songs: Song[] = [];

    public getSongs() {
        return this.songs.slice();
    }

    public setSongs(songs: Song[]) {
        this.songs = songs;
        this.songsChanged.next(this.songs.slice());
    }

}