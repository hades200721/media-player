import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/subject';
import { Http } from '@angular/http';
import { Song } from '../result-list/result-item/result-item.model';

@Injectable()
export class SoundCloudService {

    subject = new Subject<Song>();
    private clientId: string = 'ggX0UomnLs0VmW7qZnCzw';

    constructor(private http: Http) { }

    public searchSong(keyword: string) {
        let url = 'http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=' + this.clientId + '&q=' + keyword;
        return this.http.get(url);
    }
}