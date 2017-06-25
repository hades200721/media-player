import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LocalStorageService } from '../../shared/local-storage.service';
import { SearchHistory } from './search-history.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const SEARCH_KEY = 'search_history';

@Injectable()
export class SearchHistoryService {

    searchHistory: SearchHistory[];
    localStorageChange: Subject<string> = new Subject<string>();
    data = new BehaviorSubject<string>('');

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

    setSearchKeyword(keyword: string) {
        this.data.next(keyword);
    }
}