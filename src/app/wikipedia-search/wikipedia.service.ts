import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs';

const wikipediaConfig = {
    format: 'json',
    limit: '5',
    ActionType: {
        OPENSEARCH: 'opensearch',
        GETENTITIES: 'wbgetentities',
        QUERY: 'query'
    }
}

@Injectable()
export class WikipediaService {

    constructor(private jsonp: Jsonp) {
    }

    public search(term: string) {
        var search = new URLSearchParams()
        search.set('action', wikipediaConfig.ActionType.OPENSEARCH);
        search.set('search', term);
        search.set('format', wikipediaConfig.format);
        search.set('limit', wikipediaConfig.limit);
        return this.jsonp
            .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
            .map(
            (request) => request.json()[1]
            );
    }

    public getResult(term: string) {
        var search = new URLSearchParams()
        search.set('action', wikipediaConfig.ActionType.QUERY);
        search.set('exlimit', '1');
        search.set('exchars', '500');
        search.set('prop', 'extracts');
        search.set('titles', term);
        search.set('format', wikipediaConfig.format);
        // /w/api.php?action=query&format=json&prop=extracts&titles=Maria+Sharapova&exchars=175&exlimit=20
        return this.jsonp
            .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
            .map((request) => {
                let pagesArr = Object.keys(request.json().query.pages).map(function (key) { return request.json().query.pages[key]; }); // conver object to array where pageID is unkown
                return pagesArr[0];
            }
            );
    }


}