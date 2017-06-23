import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaPlayerService } from '../media-player/media-player.service';
import { Subscription } from 'rxjs/Subscription';
import { Song } from '../media-player/result-list/result-item/result-item.model';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css']
})
export class ImageContainerComponent implements OnInit, OnDestroy {

  song: Song = new Song();
  subscription: Subscription;

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


}
