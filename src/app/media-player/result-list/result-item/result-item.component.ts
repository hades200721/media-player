import { Component, OnInit, Input } from '@angular/core';
import { MediaPlayerService } from '../../media-player.service';
import { Song } from './result-item.model';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {

  @Input('data') songs: Song[];
  @Input('listview') list: boolean = true;

  constructor(private mediaPlayerService: MediaPlayerService) { }

  ngOnInit() {
  }

  selectSong(id: number) {
    this.mediaPlayerService.setSelectedSong(id);
  }


}
