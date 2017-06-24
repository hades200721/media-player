import { Component, OnInit } from '@angular/core';
import { SearchHistory } from './search-history.model';
import { SearchHistoryService } from './search-history.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {

  searchHistory: SearchHistory[];

  constructor(private searchHistoryService: SearchHistoryService) { }

  ngOnInit() {
    this.searchHistory = this.searchHistoryService.getHistoryList();

    this.searchHistoryService.localStorageChange
      .subscribe(
      (localStorageKey: string) => {
        this.searchHistory = this.searchHistoryService.getHistoryList();
      }
      )
  }

}
