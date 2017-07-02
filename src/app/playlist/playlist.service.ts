import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Song } from '../media-player/result-list/result-item/result-item.model';


@Injectable()
export class PlaylistService {

    playlistChanged = new Subject<Song[]>();

    constructor() { }

    private playlist: Song[] = [];

    getPlaylist() {
        return this.playlist.slice();
    }

    setPlaylist(songs: Song[]) {
        this.playlist = songs;
        this.playlistChanged.next(this.playlist.slice());
    }

    // return song index
    // if not exists return -1;
    songExists(id: number) {
        let index: number = -1;
        index = this.playlist.findIndex( song => {
            return song.id === id;
        })
        return index;
    }

    setRating(songIndex: number, rating: number) {
        this.playlist[songIndex].rating = rating;
    }

    addSongToPlaylist(song: Song) {
        this.playlist.push(song);
        this.playlistChanged.next(this.playlist.slice());
    }

    removeSongFromPlaylist(index: number) {
        this.playlist.splice(index, 1);
        this.playlistChanged.next(this.playlist.slice());
    }

}