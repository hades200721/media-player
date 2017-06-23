import { Component, OnInit } from '@angular/core';
import { SearchHistory } from './search-history.model';
import { LocalStorageService } from '../../shared/local-storage.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {

  searchHistory: SearchHistory[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.searchHistory = this.localStorageService.getObject('search_history');

    this.localStorageService.localStorageChange
      .subscribe(
      (localStorageKey: string) => {
        this.searchHistory = this.localStorageService.getObject(localStorageKey);
      }
      )
  }

}
