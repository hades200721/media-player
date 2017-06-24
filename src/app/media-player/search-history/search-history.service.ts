import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LocalStorageService } from '../../shared/local-storage.service';
import { SearchHistory } from './search-history.model';

const SEARCH_KEY = 'search_history';

@Injectable()
export class SearchHistoryService {

    searchHistory: SearchHistory[];
    localStorageChange: Subject<string> = new Subject<string>();

    constructor(private localStorageService: LocalStorageService) {
        this.searchHistory = localStorageService.getObject(SEARCH_KEY) || [];
    }

    addSearchHistory(newSearch: SearchHistory) {
        this.searchHistory.push(newSearch);
        this.localStorageService.setObject(SEARCH_KEY, this.searchHistory);
        this.localStorageChange.next(SEARCH_KEY);
    }

    getHistoryList() {
        return this.searchHistory.slice();
    }
}