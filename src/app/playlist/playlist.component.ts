import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription'
import { DataStorageService } from '../shared/data-storage.service';
import { PlaylistService } from './playlist.service';
import { MediaPlayerService } from '../media-player/media-player.service';
import { Song } from '../media-player/result-list/result-item/result-item.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  playlistSubscription: Subscription;
  songChangedSubscription: Subscription;

  playlist: Song[] = [];
  starts: number[] = [1, 2, 3, 4, 5];
  starHoverArr: number[] = [];

  itemsPerPage: number = 10; // max items per page for pagination
  currentP: number = 1; // defualt page is 1 for pagination

  selectedItem: Song;

  sortParameter: string = 'name';
  descending: boolean = true;

  constructor(
    private playlistService: PlaylistService,
    private dataStorageService: DataStorageService,
    private mediaPlayerService: MediaPlayerService
  ) { }

  ngOnInit() {
    this.dataStorageService.getPlaylistSongs();
    this.playlistSubscription = this.playlistService.playlistChanged
      .subscribe(
      (playlist: Song[]) => {
        this.playlist = playlist;
        this.starHoverArr = new Array(playlist.length);
      }
      )

    this.songChangedSubscription = this.mediaPlayerService.selectedSongChanged
      .subscribe
      (
      (song: Song) => {
        this.selectedItem = song;
      }
      )
  }

  sortBy(parameter: string) {
    if (this.sortParameter === parameter) {
      this.descending = !this.descending;
    } else {
      this.descending = true;
      this.sortParameter = parameter;
    }
  }

  setRating(event: Event, playlistItem: Song, rating: number) {
    const playlistItemIndex = this.playlistService.songExists(playlistItem.id);
    this.playlistService.setRating(playlistItemIndex, rating);
    this.dataStorageService.savePlaylist();
    event.stopPropagation();
  }

  removeFromPlaylist(index: number) {
    this.playlistService.removeSongFromPlaylist(index);
    this.dataStorageService.savePlaylist();
    event.stopPropagation();
  }

  onItemClick(item) {
    this.mediaPlayerService.setSelectedSong(item);
  }

  ngOnDestroy() {
    this.playlistSubscription.unsubscribe();
    this.songChangedSubscription.unsubscribe();
  }

}
