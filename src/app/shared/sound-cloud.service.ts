import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/subject';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs';
import { Song } from '../media-player/result-list/result-item/result-item.model';
import { MediaPlayerService } from '../media-player/media-player.service';
import { formatTime } from '../shared/helpers';

@Injectable()
export class SoundCloudService {

    private clientId: string = 'ggX0UomnLs0VmW7qZnCzw';
    header: Headers = new Headers({
        limit: 6
        // linked_partitioning: 1
    });

    constructor(private http: Http, private mediaPlayerService: MediaPlayerService) { }

    public getSongsList(keyword: string) {
        let url = 'http://api.soundcloud.com/tracks?client_id=' + this.clientId + '&linked_partitioning=1&q=' + keyword + '&limit=6';
        return this.http.get(url)
            .map(
            (respone: Response) => {
                const collection = respone.json().collection;
                let songsList: Song[] = [];
                const hasNext: string = respone.json().next_href;
                collection.forEach(element => {
                    const duration = formatTime(element.duration);
                    songsList.push(
                        new Song(element.id, element.title, element.genre, element.description, duration, element.artwork_url)
                    );
                });
                return { songs: songsList, nextLink: hasNext };
            })
            .subscribe(
            (response: { songs: Song[], nextLink: string }) => {
                this.mediaPlayerService.setSongs(response.songs, response.nextLink);
            })
    }

    public getNextList(url: string) {
        return this.http.get(url)
            .map(
            (respone: Response) => {
                const collection = respone.json().collection;
                let songsList: Song[] = [];
                const hasNext: string = respone.json().next_href;
                collection.forEach(element => {
                    songsList.push(
                        new Song(element.id, element.title, element.genre, element.description, element.duration, element.artwork_url)
                    );
                });
                return { songs: songsList, nextLink: hasNext };
            })
            .subscribe(
            (response: { songs: Song[], nextLink: string }) => {
                this.mediaPlayerService.setSongs(response.songs, response.nextLink);
            })
    }

    public next(url: string) {
        return this.http.get(url);
    }
}