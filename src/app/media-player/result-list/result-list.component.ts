import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SoundCloudService } from '../../shared/sound-cloud.service';
import { Response } from '@angular/http';
import { MediaPlayerService } from '../media-player.service';
import { Subscription } from 'rxjs/subscription';

import * as _ from 'underscore';

import { SearchHistoryService } from '../search-history/search-history.service';
import { Song } from '../result-list/result-item/result-item.model';
import { SearchHistory } from '../search-history/search-history.model';

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
  
  songsList: Song[];
  hasNext: string = '';
  subscription: Subscription;
  searchSubscription: Subscription;
  tooltipView: string = 'list';
  listView: boolean = true;
  config = {};

  constructor(
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

    this.searchSubscription = this.searchHistoryService.data
      .subscribe(
      (keyword) => {
        this.keyword.nativeElement.value = keyword;
        if (keyword) {
          this.onSearch();
        }
      }
      );

      Ps.initialize(this.body.nativeElement);
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
    this.searchSubscription.unsubscribe();
  }

}

let pluckMany = function (source, propertiesToPluck: string[]) {
  return _.map(source, function (item) {
    var obj = {};
    _.each(propertiesToPluck, function (property) {
      obj[property] = item[property];
    });
    return obj;
  });
};