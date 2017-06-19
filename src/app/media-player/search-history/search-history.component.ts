import { Component, OnInit } from '@angular/core';
import { SearchHistory } from './search-history.model';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {

  searchHistory: SearchHistory[] = [
    new SearchHistory('dfsdf', 'fsdgsdg'),
    new SearchHistory('df2222222sdf', '3333333333')
  ];

  constructor() { }

  ngOnInit() {
  }

}
