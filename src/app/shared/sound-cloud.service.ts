import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/subject';
import { Http, Headers } from '@angular/http';
import { Song } from '../result-list/result-item/result-item.model';

@Injectable()
export class SoundCloudService {

    subject = new Subject<Song>();
    private clientId: string = 'ggX0UomnLs0VmW7qZnCzw';
    header: Headers = new Headers({
        limit: 6
        // linked_partitioning: 1
    });

    constructor(private http: Http) { }

    public searchSong(keyword: string) {
        let url = 'http://api.soundcloud.com/tracks?client_id=' + this.clientId + '&linked_partitioning=1&q=' + keyword + '&limit=6';
        return this.http.get(url);//, { headers: this.header });
    }

    public next(url: string) {
        return this.http.get(url);//, { headers: this.header });
    }
}