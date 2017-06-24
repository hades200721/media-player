import { Component, OnInit } from '@angular/core';
import { MediaPlayerService } from '../media-player/media-player.service';
import { Subscription } from 'rxjs/Subscription';
import { Song } from '../media-player/result-list/result-item/result-item.model';
import { formatTime } from '../shared/helpers';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.css']
})
export class PlayerControlsComponent implements OnInit {

  song: Song = null;
  subscription: Subscription;

  showDuration: boolean = true;
  passedTime: number = 5;

  constructor(private mediaPlayerService: MediaPlayerService) { }

  ngOnInit() {
    this.subscription = this.mediaPlayerService.selectedSongChanged
      .subscribe(
      (song) => {
        this.song = song;
      }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  timeLeft() {
    return formatTime(this.song.duration - this.passedTime * 1000);
  }


}
