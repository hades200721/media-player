import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WikipediaSearchComponent } from './wikipedia-search/wikipedia-search.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { AboutComponent } from './about/about.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { ContactComponent } from './contact/contact.component';

import { MediaPlayerService } from './media-player/media-player.service';
import { WikipediaService } from './wikipedia-search/wikipedia.service';
import { LocalStorageService } from './shared/local-storage.service';
import { DataStorageService } from './shared/data-storage.service';
import { SearchHistoryService } from './search-history/search-history.service';

import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';
import { MediaPlayerModule } from './media-player/media-player.module';
import { PlayerControlsModule } from './player-controls/player-controls.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WikipediaSearchComponent,
    NavigatorComponent,
    AboutComponent,
    SearchHistoryComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MediaPlayerModule,
    AppRoutingModule,
    JsonpModule,
    ReactiveFormsModule,
    PlaylistModule,
    PlayerControlsModule,
    AuthModule
  ],
  providers: [
    WikipediaService,
    MediaPlayerService,
    LocalStorageService,
    DataStorageService,
    SearchHistoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
