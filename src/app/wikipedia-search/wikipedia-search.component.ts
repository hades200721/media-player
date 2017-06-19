import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { FormControl } from '@angular/forms';
import 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { WikipediaService } from './wikipedia.service';
import { initObservable } from '../shared/init-observable';

@Component({
  selector: 'app-wikipedia-search',
  templateUrl: './wikipedia-search.component.html',
  styleUrls: ['./wikipedia-search.component.css']
})
export class WikipediaSearchComponent implements OnInit {

  term = new FormControl();
  items: Observable<Array<string>>;
  constructor(private wikipediaService: WikipediaService) {
  }

  ngOnInit() {
    this.items = this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.wikipediaService.search(term));
  }

  findTerm(keyword: string) {
    // this.wikipediaService.search(keyword)
    //   .then(
    //   (items) => {
    //     this.items = items;
    //   })
  }


}
