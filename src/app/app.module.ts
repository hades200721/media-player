import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ResultItemComponent } from './result-list/result-item/result-item.component';

import { MediaPlayerModule } from './media-player/media-player.module';
import { HomePageComponent } from './home-page/home-page.component';
import { WikipediaSearchComponent } from './wikipedia-search/wikipedia-search.component';
import { NavigatorComponent } from './navigator/navigator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WikipediaSearchComponent,
    NavigatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MediaPlayerModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
