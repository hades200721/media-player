import { Component, OnInit } from '@angular/core';
import { SoundCloudService } from '../shared/sound-cloud.service';

import { Song } from '../result-list/result-item/result-item.model'

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {

  songList: Song[] = [];

  constructor(private soundCloudService: SoundCloudService) { }

  ngOnInit() {
  }

}
