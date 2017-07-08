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
        index = this.playlist.findIndex(song => {
            return song.id === id;
        })
        return index;
    }

    findNextSong(id: number, loop: boolean, shuffle: boolean): Song {
        const songIndex = this.songExists(id);
        if (songIndex === -1) {
            return null;
        }
        if (shuffle) {
            const rndIndex = Math.ceil(Math.random() * this.playlist.length); // random song from playlist array
            console.log('randmon index for song: ' + rndIndex);
            return this.playlist[rndIndex];
        }
        if (loop && songIndex === (this.playlist.length - 1)) { // loop is on and current song is the last song
            return this.playlist[0];
        }
        return this.playlist[songIndex + 1];
    }

    findPreviousSong(id: number, shuffle: boolean): Song {
        const songIndex = this.songExists(id);
        if (songIndex === -1) {
            return null;
        }
        if (shuffle) {
            const rndIndex = Math.ceil(Math.random() * this.playlist.length); // random song from playlist array
            console.log('randmon index for song: ' + rndIndex);
            return this.playlist[rndIndex];
        }
        return this.playlist[songIndex - 1] || this.playlist[0];
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