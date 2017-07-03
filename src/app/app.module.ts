import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { WikipediaService } from './wikipedia-search/wikipedia.service';
import { AuthService } from './auth/auth.service';

import { MediaPlayerModule } from './media-player/media-player.module';
import { MediaPlayerService } from './media-player/media-player.service';
import { SoundCloudService } from './shared/sound-cloud.service';
import { HomePageComponent } from './home-page/home-page.component';
import { WikipediaSearchComponent } from './wikipedia-search/wikipedia-search.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { AboutComponent } from './about/about.component';
import { LocalStorageService } from './shared/local-storage.service';
import { DataStorageService } from './shared/data-storage.service';
import { PlaylistService } from './playlist/playlist.service';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { SearchHistoryService } from './search-history/search-history.service';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SortAlphabeticalPipe } from './pipes/sort-alphabetical.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WikipediaSearchComponent,
    NavigatorComponent,
    AboutComponent,
    PlayerControlsComponent,
    PlaylistComponent,
    SearchHistoryComponent,
    SigninComponent,
    SignupComponent,
    SortAlphabeticalPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MediaPlayerModule,
    AppRoutingModule,
    JsonpModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    WikipediaService,
    MediaPlayerService,
    SoundCloudService,
    LocalStorageService,
    DataStorageService,
    SearchHistoryService,
    PlaylistService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
