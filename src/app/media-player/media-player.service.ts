import { Injectable } from '@angular/core';
import { Song } from './result-list/result-item/result-item.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MediaPlayerService {

    songsChanged = new Subject<{ songs: Song[], next: string }>();
    selectedSongChanged = new Subject<Song>();
    private selectedSong: Song;
    private songs: Song[] = [];
    private nextLink: string;

    public getSongs() {
        return this.songs.slice();
    }

    public getNextLink() {
        return this.nextLink;
    }

    public setSongs(songs: Song[], nextHref: string) {
        this.songs = songs;
        this.nextLink = nextHref;
        this.songsChanged.next({ songs: this.songs.slice(), next: this.nextLink });
    }

    public setSelectedSong(id: number) {
        this.selectedSong = this.songs.find(song => { return song.id === id });
        this.selectedSongChanged.next(this.selectedSong);
    }

}