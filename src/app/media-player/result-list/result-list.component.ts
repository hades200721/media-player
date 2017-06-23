import { Component, OnInit } from '@angular/core';
import { SoundCloudService } from '../../shared/sound-cloud.service';
import { Response } from '@angular/http';
import { MediaPlayerService } from '../media-player.service';
import { Subscription } from 'rxjs/subscription';

import * as _ from 'underscore';

import { SearchHistoryService } from '../search-history/search-history.service';
import { Song } from '../result-list/result-item/result-item.model';
import { SearchHistory } from '../search-history/search-history.model';


@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {

  songsList: Song[];
  hasNext: string = '';
  subscription: Subscription;
  tooltipView: string = 'list';
  listView: boolean = true;

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
      )
  }

  onSearch(keyword: string) {
    this.soundCloudService.getSongsList(keyword);
  }

  addToSearchHistory(keyword: string) {
    let data = new SearchHistory(keyword);
    this.searchHistoryService.addSearchHistory(data);
  }

  onNextList() {
    const url = this.mediaPlayerService.getNextLink();
    this.soundCloudService.getNextList(url);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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