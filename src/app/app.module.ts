import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { WikipediaService } from './wikipedia-search/wikipedia.service';

import { MediaPlayerModule } from './media-player/media-player.module';
import { MediaPlayerService } from './media-player/media-player.service';
import { SoundCloudService } from './shared/sound-cloud.service';
import { HomePageComponent } from './home-page/home-page.component';
import { WikipediaSearchComponent } from './wikipedia-search/wikipedia-search.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WikipediaSearchComponent,
    NavigatorComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MediaPlayerModule,
    AppRoutingModule,
    JsonpModule,
    ReactiveFormsModule
  ],
  providers: [WikipediaService, MediaPlayerService, SoundCloudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
