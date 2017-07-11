import {
  Component, OnInit, OnDestroy,
  trigger, state, style,
  transition, animate, keyframes
} from '@angular/core';
import { MediaPlayerService } from '../media-player/media-player.service';
import { SoundManager } from './sound-manager.service';
import { Subscription } from 'rxjs/Subscription';
import { Song } from '../media-player/result-list/result-item/result-item.model';
import { Events } from '../shared/event.model';
import { formatTime } from '../shared/helpers';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.css'],
  animations: [
    trigger('controls', [
      transition('void => active', [
        animate(750, keyframes([
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

  subscription: Subscription;
  state: string = 'inactive';

  repeatOption: Array<string> = ['repeat', 'repeat-one', 'repeat-all'];
  currentRepeatOption: number = 0;
  expanded: boolean = false;
  showDuration: boolean = true;

  song: Song = null;
  passedTime: number = 0; // in milliseconds
  tooltipText: string = '';

  constructor(
    private soundManager: SoundManager,
    private mediaPlayerService: MediaPlayerService
  ) { }

  ngOnInit() {
    this.subscription = this.mediaPlayerService.selectedSongChanged
      .subscribe(
      (song) => {
        this.song = song;
        this.state = 'active';
      }
      )

    this.soundManager.on(Events.Time, (time: number) => {
      this.passedTime = time;
      console.log(time);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  progressHandlerPosition() {
    return (this.passedTime / this.song.duration) * 100;
  }

  timeLeft() {
    return formatTime(this.song.duration - this.passedTime);
  }

  timePassed() {
    return formatTime(this.passedTime);
  }

  updateTime(event: MouseEvent) {
    const range = (<HTMLElement>event.target).parentElement.offsetWidth;
    const deltaX = event['deltaX'];
    let newTime = (this.passedTime / this.song.duration) + (deltaX / range);    
    this.soundManager.seek(Math.min(Math.max(newTime * 100, 0), this.song.duration));
  }

  updateVolume(event: MouseEvent) {
    const deltaY = event['deltaY'];
    let newVolume = this.soundManager.getVolume() - deltaY;
    this.soundManager.setVolume(Math.min(Math.max(newVolume, 0), 100));
  }


}
