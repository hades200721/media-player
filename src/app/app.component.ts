import { Component } from '@angular/core';
import { SoundCloudService } from './shared/sound-cloud.service';
import { Response } from '@angular/http';
import 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private soundCloudService: SoundCloudService) { }

  onSearch(keyword: string) {
    this.soundCloudService.searchSong(keyword)
    .map(
      (respone: Response) => {
        let songsList = respone.json();
        return songsList;
      }
    )
    .subscribe(
      (response) => {
        console.info(response);
      }
    )
  }
}
