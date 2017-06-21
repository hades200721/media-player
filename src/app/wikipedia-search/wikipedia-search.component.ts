import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { FormControl } from '@angular/forms';
import 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { WikipediaService } from './wikipedia.service';
import { initObservable } from '../shared/init-observable';
import { Article } from './article.model';

@Component({
  selector: 'app-wikipedia-search',
  templateUrl: './wikipedia-search.component.html',
  styleUrls: ['./wikipedia-search.component.css']
})
export class WikipediaSearchComponent implements OnInit {

  term = new FormControl();
  items: Observable<Array<string>>;
  result: Article = new Article('', '', '');
  constructor(private wikipediaService: WikipediaService) {
  }

  ngOnInit() {
    this.items = this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.wikipediaService.search(term));
  }

  getArticle(term: string) {
    this.wikipediaService.getResult(term)
      .subscribe(
      (response: Article) => this.result = new Article(response.pageid, response.extract, response.title)
      );
  }


}
