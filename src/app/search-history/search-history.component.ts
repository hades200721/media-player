import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchHistory } from './search-history.model';
import { SearchHistoryService } from './search-history.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {

  searchHistory: SearchHistory[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchHistoryService: SearchHistoryService
  ) { }

  ngOnInit() {
    this.searchHistory = this.searchHistoryService.getHistoryList();

    this.searchHistoryService.localStorageChange
      .subscribe(
      (localStorageKey: string) => {
        this.searchHistory = this.searchHistoryService.getHistoryList();
      }
      )
  }

  onSearchHistoryClick(keyword) {
    this.router.navigate(['search'], { fragment: keyword });
  }

}
