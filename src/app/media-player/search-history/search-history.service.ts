import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { SearchHistory } from './search-history.model';

@Injectable()
export class SearchHistoryService {

    history: SearchHistory[];

    constructor(private localStorageService: LocalStorageService) {
        this.history = localStorageService.getObject('search_history')|| [];
    }

    addSearchHistory(newSearch: SearchHistory) {
        this.history.push(newSearch);
        this.localStorageService.setObject('search_history', this.history);
    }

    getHistoryList() {
        return this.history.splice(0);
    }
}