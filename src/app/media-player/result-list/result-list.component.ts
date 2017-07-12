import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SoundCloudService } from '../../shared/sound-cloud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { MediaPlayerService } from '../media-player.service';
import { Subscription } from 'rxjs/subscription';

import { Song } from '../../shared/song.model';
import { SearchHistoryService } from '../../search-history/search-history.service';
import { SearchHistory } from '../../search-history/search-history.model';

declare var require: any;
var Ps = require('perfect-scrollbar');

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {

  @ViewChild('keyword') keyword: ElementRef;
  @ViewChild('bodyContainer') body: ElementRef;

  fragmentSubscription: Subscription;
  songsList: Song[];
  hasNext: string = '';
  subscription: Subscription;
  listView: boolean = true;
  config = {};

  constructor(
    private route: ActivatedRoute,
    private soundCloudService: SoundCloudService,
    private mediaPlayerService: MediaPlayerService,
    private searchHistoryService: SearchHistoryService,
  ) { }

  ngOnInit() {
    this.songsList = this.mediaPlayerService.getSongs();
    this.subscription = this.mediaPlayerService.songsChanged
      .subscribe(
      ({ songs, next }) => {
        this.songsList = songs;
        this.hasNext = next;
      }
      );

    this.fragmentSubscription = this.route.fragment
      .subscribe(
      (keyword: string) => {
        if (keyword) {
          this.keyword.nativeElement.value = keyword;
          this.onSearch();
        }
      }
      );

    Ps.initialize(this.body.nativeElement); // prefect scroller init
    (<HTMLElement>this.keyword.nativeElement).addEventListener('input', e => this.onSearch());
  }

  onSearch() {
    this.soundCloudService.getSongsList(this.keyword.nativeElement.value);
  }

  addToSearchHistory() {
    let data = new SearchHistory(this.keyword.nativeElement.value);
    this.searchHistoryService.addSearchHistory(data);
  }

  onNextList() {
    const url = this.mediaPlayerService.getNextLink();
    this.soundCloudService.getNextList(url);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.fragmentSubscription.unsubscribe();
  }

}
