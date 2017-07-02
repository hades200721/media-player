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

  subscription: Subscription;
  playlist: Song[] = [];
  starts: number[] = [1, 2, 3, 4, 5];
  starHover: number = -1; // unranked

  constructor(
    private playlistService: PlaylistService,
    private dataStorageService: DataStorageService,
    private mediaPlayerService: MediaPlayerService
  ) { }

  ngOnInit() {
    this.dataStorageService.getPlaylistSongs();
    this.subscription = this.playlistService.playlistChanged
      .subscribe(
      (playlist: Song[]) => {
        this.playlist = playlist;
      }
      )

  }

  setRating(playlistItemIndex: number, rating: number) {
    this.playlistService.setRating(playlistItemIndex, rating);
    this.dataStorageService.savePlaylist();
  }

  removeFromPlaylist(index: number) {
    this.playlistService.removeSongFromPlaylist(index);
    this.dataStorageService.savePlaylist();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
