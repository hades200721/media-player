import { Component, OnInit } from '@angular/core';
import { SoundCloudService } from '../../shared/sound-cloud.service';
import { Response } from '@angular/http';
import 'rxjs';
import * as _ from 'underscore';

import { Song } from '../result-list/result-item/result-item.model';


@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {

  songsList: Song[] = [ new Song(1, 'testing', '', '') ];
  hasNext: string = '';

  constructor(private soundCloudService: SoundCloudService) { }

  ngOnInit() {

  }


  onSearch(keyword: string) {
    this.soundCloudService.searchSong(keyword)
      .map(
      (respone: Response) => {
        this.songsList = [];
        let songs = respone.json().collection;
        this.hasNext = respone.json().next_href;
        songs.forEach(element => {
          this.songsList.push(
            new Song(element.id, element.title, '', '')
          );
        });
      })
      .subscribe(
      (response) => {
        console.info(response);

      })
  }

  onNextList() {
    this.soundCloudService.next(this.hasNext)
      .map(
      (respone: Response) => {
        this.songsList = [];
        let songs = respone.json().collection;
        this.hasNext = respone.json().next_href;
        songs.forEach(element => {
          this.songsList.push(
            new Song(element.id, element.title, '', '')
          );
        });
      })
      .subscribe(
      (response) => {
        console.info(response);
      })
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