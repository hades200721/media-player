import { Component, OnInit, Input } from '@angular/core';
import { Song } from './result-item.model';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {

  @Input('data') song: Song;
  constructor() { }

  ngOnInit() {
  }

}
