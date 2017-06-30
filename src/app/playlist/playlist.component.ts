import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { PlaylistService } from './playlist.service';
import { Song } from '../media-player/result-list/result-item/result-item.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  playlist: Song[] = [];
  starts: number[] = [1,2,3,4,5];

  constructor(
    private playlistService: PlaylistService,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.playlist = [{
      artist: 'Mike Posner',
      description: 'Mike Posner - Please Dont Go (Adventure Club D...',
      duration: 256253,
      durationStr: '04:16',
      genre: 'Dubstep Electronic',
      id: 8127112,
      imagePath: 'https://i1.sndcdn.com/artworks-000003643515-yzt2o1-t500x500.jpg',
      name: 'Mike Posner - Please Dont Go (Adventure Club D...',
    },
    {
      artist: 'Wayne Wonder ',
      description: '',
      duration: 128570,
      durationStr: '02:08',
      genre: 'reggae',
      id: 32995173,
      imagePath: 'https://i1.sndcdn.com/artworks-000125406210-n1qj4g-t500x500.jpg',
      name: 'Wayne Wonder - No Letting Go'
    }
    ];

    // this.dataStorageService.getPlaylistSongs().subscribe(
    //   (songs: any) => {
    //     debugger;
    //     this.playlist = songs;
    //   }
    // )
  }

}
