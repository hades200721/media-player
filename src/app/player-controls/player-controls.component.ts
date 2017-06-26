import {
  Component, OnInit, OnDestroy,
  trigger, state, style,
  transition, animate, keyframes
} from '@angular/core';
import { MediaPlayerService } from '../media-player/media-player.service';
import { Subscription } from 'rxjs/Subscription';
import { Song } from '../media-player/result-list/result-item/result-item.model';
import { formatTime } from '../shared/helpers';



@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.css'],
  animations: [
    trigger('controls', [
      transition('void => active', [
        animate(500, keyframes([
          style({ transform: 'translateY(50px)', offset: 0 }),
          style({ transform: 'translate(0px)', offset: 1 }),
        ]))
      ]),
      state('inactive', style({
        transform: 'translateY(50px)'
      }))
    ])
  ]
})
export class PlayerControlsComponent implements OnInit, OnDestroy {

  repeatOption: Array<string> = ['repeat', 'repeat-one', 'repeat-all'];
  song: Song = null;
  subscription: Subscription;
  expanded: boolean = false;
  showDuration: boolean = true;
  currentRepeatOption: number = 0;
  passedTime: number = 5000; // in milliseconds
  muted: boolean = false;
  state: string = 'inactive';

  constructor(private mediaPlayerService: MediaPlayerService) { }

  ngOnInit() {
    this.subscription = this.mediaPlayerService.selectedSongChanged
      .subscribe(
      (song) => {
        this.song = song;
        this.state = 'active';
      }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  timeLeft() {
    return formatTime(this.song.duration - this.passedTime);
  }

  timePassed() {
    return formatTime(this.passedTime);
  }


}
