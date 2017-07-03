import { Component, OnInit, Input } from '@angular/core';
import { MediaPlayerService } from '../../media-player.service';
import { PlaylistService } from '../../../playlist/playlist.service';
import { AuthService } from '../../../auth/auth.service';
import { DataStorageService } from '../../../shared/data-storage.service';
import { Song } from './result-item.model';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {

  @Input('data') songs: Song[];
  @Input('listview') list: boolean = true;
  selectedSong: Song = null;

  constructor(
    private authService: AuthService,
    private playlistService: PlaylistService,
    private mediaPlayerService: MediaPlayerService,
    private dataStorageService: DataStorageService    
  ) { }

  ngOnInit() {
  }

  addRemoveToPlaylist(event: Event, song: Song) {
    let songIndex = this.playlistService.songExists(song.id);
    if (songIndex === -1) {
      this.playlistService.addSongToPlaylist(song);
    } else {
      this.playlistService.removeSongFromPlaylist(songIndex);
    }
    this.dataStorageService.savePlaylist();
    event.stopPropagation();
  }

  playlistInclude(id: number) {
    return (this.playlistService.songExists(id) !== -1);
  }


}
